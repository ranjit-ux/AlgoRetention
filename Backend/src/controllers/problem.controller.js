import Problem from "../models/Problem.js";
import CompanyQuestionMapping from "../models/CompanyQuestionMapping.js";
import { calculateNextRevisionDate } from "../utils/calculateNextRevisionDate.js";

export const createProblem = async (req, res) => {
    try {
        const {
            title,
            problemNumber,
            link,
            difficulty,
            topic,
            customTopic,
            notes,
            timeComplexity,
            spaceComplexity,
        } = req.body;


        const existingProblem = await Problem.findOne({
            user: req.user._id,
            problemNumber,
        });

        // Problem already exists => Treat as Re-Solved

        if (existingProblem) {
            const today = new Date();

            existingProblem.lastRevisionDate = today;
            existingProblem.solvedAt = today;

            existingProblem.revisionCount += 1;

            const nextRevisionDate =
                calculateNextRevisionDate(
                    difficulty
                );

            existingProblem.nextRevisionDate =
                nextRevisionDate;

            await existingProblem.save();

            return res.status(200).json({
                success: true,
                message:
                    "Problem re-solved successfully",
                problem: existingProblem,
            });
        }

        // Auto Fetch Companies

        const companyMapping =
            await CompanyQuestionMapping.findOne({
                problemNumber,
            });

        const companies =
            companyMapping?.companies || [];

        // First Time Solve

        const today = new Date();

        const nextRevisionDate =
            calculateNextRevisionDate(
                difficulty
            );

        const problem = await Problem.create({
            user: req.user._id,

            title,
            problemNumber,
            link,

            difficulty,

            topic,
            customTopic,

            notes,

            timeComplexity,
            spaceComplexity,

            companies,

            solvedAt: today,

            lastRevisionDate: today,

            nextRevisionDate,

            revisionCount: 0,

            // SM-2 Initial State

            repetition: 0,

            interval: 1,

            easinessFactor: 2.5,

            successfulRevisions: 0,

            failedRevisions: 0,
        });

        return res.status(201).json({
            success: true,
            problem,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getProblems = async (req, res) => {
    try {
        const {
            page=1,
            limit=20,
            search,
            difficulty,
            topic,
            company,
            status,
        } = req.query;
        
        const query = {
            user: req.user._id,
        };

        //search by title
        if(search){
            query.title = {
                $regex: search,
                $options:"i",
            };
        }

        //difficulty filter
        if(difficulty){
            query.difficulty = difficulty;
        }

        //topic filter
        if(topic){
            query.topic = topic;
        }

        if(status){
            query.status=status;
        }

        //company filter
        if(company){
            query["companies.company"]=company;
        }

        const totalProblems = await Problem.countDocuments(query);

        const problems = await Problem.find(query)
        .sort({createdAt: -1})
        .skip((page-1)*limit)
        .limit(Number(limit));
        

        return res.status(200).json({
            success: true,

            pagination: {
                currentPage: Number(page),

                totalPages: Math.ceil(totalProblems/limit),
                totalProblems,
                limit: Number(limit),
            },

            count: problems.length,
            problems,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getProblemById = async (req,res) => {
    try {
        const problem = await Problem.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found",
            });
        }

        return res.status(200).json({
            success: true,
            problem,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateProblem = async (req,res) => {
    try {
        const problem =
            await Problem.findOneAndUpdate(
                {
                    _id: req.params.id,
                    user: req.user._id,
                },
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            );

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found",
            });
        }

        return res.status(200).json({
            success: true,
            problem,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteProblem = async (req,res) => {
    try {
        const problem =
            await Problem.findOneAndDelete({
                _id: req.params.id,
                user: req.user._id,
            });

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found",
            });
        }

        return res.status(200).json({
            success: true,
            message:
                "Problem deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getProblemFilters = async(req,res) => {
    try{
        const topics = await Problem.distinct(
            "topic",
            {
                user:req.user._id,
            }
        );

        const companies = await Problem.aggregate([
            {
                $match: {user: req.user._id,},
            },
            {
                $unwind: "$companies",
            },
            {
                $group:{_id:"$companies.company"},
            },
            {
                $sort: {_id: 1,},
            },
        ]);

        return res.status(200).json({
            success: true,
            topic,
            companies: companies.map((c) => c._id),
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getDueRevisions = async(req,res) => {
    try{
        const today = new Date();
        
        today.setHours(23,59,59,999);

        const problems = await Problem.find({
            user: req.user._id,
            nextRevisionDate: {
                $lte: today
            }
        }).sort({
            nextRevisionDate: 1
        });

        res.status(200).json({
            success: true,
            count: problems.length,
            problems
        });
    }catch(error){
        res.status(500).json({
            sucess: false,
            message: error.message
        });
    }
};