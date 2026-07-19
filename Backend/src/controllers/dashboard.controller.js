import Problem from "../models/Problem.js";
import RevisionRecord from "../models/RevisionRecord.js";

export const getDashboardData = async (
    req,
    res
) => {
    try {
        const userId = req.user._id;

        const today = new Date();

        today.setHours(
            23,
            59,
            59,
            999
        );

        // =================================
        // Total Problems
        // =================================

        const totalProblems =
            await Problem.countDocuments({
                user: userId,
            });

        // =================================
        // Due Today
        // =================================

        const dueToday =
            await Problem.countDocuments({
                user: userId,

                nextRevisionDate: {
                    $lte: today,
                },
            });

        // =================================
        // Today's Revision Queue
        // =================================

        const todayQueue =
            await Problem.find({
                user: userId,

                nextRevisionDate: {
                    $lte: today,
                },
            })
                .sort({
                    nextRevisionDate: 1,
                })
                .limit(100)
                .select(
                    `
                    title
                    problemNumber
                    difficulty
                    topic
                    companies
                    nextRevisionDate
                    lastRevisionDate
                    status
                    retentionScore
                `
                );

        // =================================
        // Recent Problems
        // =================================

        const recentProblems =
            await Problem.find({
                user: userId,
            })
                .sort({
                    createdAt: -1,
                })
                .limit(20)
                .select(
                    `
                    title
                    problemNumber
                    difficulty
                    topic
                    companies
                    retentionScore
                    nextRevisionDate
                    status
                `
                );

        // =================================
        // Company Statistics
        // =================================

        const companyAggregation =
            await Problem.aggregate([
                {
                    $match: {
                        user: userId,
                    },
                },

                {
                    $unwind: "$companies",
                },

                {
                    $group: {
                        _id:
                            "$companies.company",

                        count: {
                            $sum: 1,
                        },
                    },
                },

                {
                    $match: {
                        count: {
                            $gt: 1,
                        },
                    },
                },

                {
                    $sort: {
                        count: -1,
                    },
                },
            ]);

        const companyStats =
            companyAggregation.map(
                (item) => ({
                    company: item._id,
                    count: item.count,
                })
            );

        // =================================
        // Retention Score
        // =================================

        const retentionAggregation =
            await Problem.aggregate([
                {
                    $match: {
                        user: userId,
                    },
                },

                {
                    $group: {
                        _id: null,

                        averageRetention:
                            {
                                $avg:
                                    "$retentionScore",
                            },
                    },
                },
            ]);

        const retentionScore =
            retentionAggregation[0]
                ?.averageRetention || 0;

        // =================================
        // Heatmap Data
        // =================================

        const heatmap =
            await RevisionRecord.aggregate([
                {
                    $match: {
                        user: userId,
                    },
                },

                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format:
                                    "%Y-%m-%d",

                                date:
                                    "$revisionDate",
                            },
                        },

                        count: {
                            $sum: 1,
                        },
                    },
                },

                {
                    $sort: {
                        _id: 1,
                    },
                },
            ]);

        // =================================
        // Memory Health Distribution
        // =================================

        const memoryHealth =
            await Problem.aggregate([
                {
                    $match: {
                        user: userId,
                    },
                },

                {
                    $group: {
                        _id: {
                            $switch: {
                                branches: [
                                    {
                                        case: {
                                            $gte: [
                                                "$retentionScore",
                                                80,
                                            ],
                                        },

                                        then: "Strong",
                                    },

                                    {
                                        case: {
                                            $gte: [
                                                "$retentionScore",
                                                50,
                                            ],
                                        },

                                        then: "Moderate",
                                    },
                                ],

                                default:
                                    "Weak",
                            },
                        },

                        count: {
                            $sum: 1,
                        },
                    },
                },
            ]);

        // =================================
        // Final Response
        // =================================

        return res.status(200).json({
            success: true,

            stats: {
                totalProblems,

                dueToday,

                currentStreak:
                    req.user
                        .currentStreak,

                bestStreak:
                    req.user
                        .bestStreak,

                retentionScore:
                    Math.round(
                        retentionScore
                    ),
            },

            companyStats,

            todayQueue,

            recentProblems,

            heatmap,

            memoryHealth,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};