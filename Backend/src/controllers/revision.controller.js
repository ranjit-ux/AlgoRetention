import Problem from "../models/Problem.js";
import RevisionRecord from "../models/RevisionRecord.js";
import { calculateSM2 } from "../utils/sm2.js";
import { updateUserStreak } from "../utils/updateUserStreak.js";

export const reviseProblem = async (req,res) => {
    try {
        const { quality } = req.body;

        if(quality===undefined || ![0,3,4,5].includes(quality)){
            return res.status(400).json({
                success:false,
                message:"Quality must be 0, 3, 4 or 5"
            });
        }

        const problem = await Problem.findOne({
                _id: req.params.problemId,
                user: req.user._id,
            });

        if (!problem) {
            return res.status(404).json({
                success: false,
                message:"Problem not found",
            });
        }

        const intervalBefore = problem.interval;

        const efBefore = problem.easinessFactor;

        const repetitionBefore = problem.repetition;

        const sm2Result = calculateSM2(
                quality,
                problem.repetition,
                problem.interval,
                problem.easinessFactor
            );

        await RevisionRecord.create({
            user: req.user._id,

            problem: problem._id,

            quality,

            intervalBefore,

            intervalAfter:sm2Result.interval,

            efBefore,

            efAfter:sm2Result.easinessFactor,

            repetitionBefore,

            repetitionAfter:sm2Result.repetition,
        });

        problem.repetition = sm2Result.repetition;

        problem.interval = sm2Result.interval;

        problem.easinessFactor = sm2Result.easinessFactor;

        problem.nextRevisionDate = sm2Result.nextRevisionDate;

        problem.lastRevisionDate = new Date();

        problem.revisionCount += 1;

        if (quality === 0) {
            problem.failedRevisions+=1;
            problem.status="Forgotten";
        } else {
            problem.successfulRevisions += 1;
            problem.status =
                "Solved";
        }

        const totalRevisions=problem.successfulRevisions + problem.failedRevisions;

        if(totalRevisions>0){
            problem.retentionScore = Math.round((problem.successfulRevisions / totalRevisions) * 100);
        }

        await problem.save();

        await updateUserStreak(req.user._id);

        return res.status(200).json({
            success: true,
            message:"Revision completed successfully",

            revision: {
                quality,
                repetition:sm2Result.repetition,
                interval: sm2Result.interval,
                easinessFactor: sm2Result.easinessFactor,
                nextRevisionDate: sm2Result.nextRevisionDate,
            },

            problem,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message:
                error.message,
        });
    }
};



export const getTodayRevisions = async(req,res) => {
    try{
        const today = new Date();

        today.setHours(23,59,59,999);

        console.log("Current User:",req.user._id);
        console.log("Today:",today);

        const problems = await Problem.find({
            user:req.user._id,

            nextRevisionDate:{
                $lte: today,
            },
        }).sort({
            nextRevisionDate:1,
        }).select(
            `
            title
            problemNumber
            difficulty
            topic
            companies
            link
            notes
            timeComplexity
            spaceComplexity
            nextRevisionDate
            lastRevisionDate
            retentionScore
            revisionCount
            status
            `
        );
        console.log("Problems Found:", problems.length);
        console.log(problems);
        return res.status(200).json({
            success: true,
            count: problems.length,
            problems,
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};