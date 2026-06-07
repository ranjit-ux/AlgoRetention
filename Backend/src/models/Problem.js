import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // Problem Info

        title: {
            type: String,
            required: true,
            trim: true,
        },

        problemNumber: {
            type: Number,
            required: true,
        },

        link: {
            type: String,
            default: "",
        },

        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true,
        },

        topic: {
            type: String,
            required: true,
        },

        customTopic: {
            type: String,
            default: "",
        },

        // Learning Data

        notes: {
            type: String,
            default: "",
        },

        timeComplexity: {
            type: String,
            default: "",
        },

        spaceComplexity: {
            type: String,
            default: "",
        },

        // Company Data

        companies: [
            {
                company: {
                    type: String,
                    trim: true,
                },
                frequency: {
                    type: Number,
                    default: 0,
                },
            },
        ],

        // Revision Tracking

        revisionCount: {
            type: Number,
            default: 0,
        },

        overdueCount: {
            type: Number,
            default: 0,
        },

        lastRevisionDate: {
            type: Date,
        },

        nextRevisionDate: {
            type: Date,
        },

        // SM-2 State

        repetition: {
            type: Number,
            default: 0,
        },

        interval: {
            type: Number,
            default: 1,
        },

        easinessFactor: {
            type: Number,
            default: 2.5,
        },

        // Retention

        retentionScore: {
            type: Number,
            default: 100,
        },
        successfulRevisions: {
            type: Number,
            default:0,
        },
        failedRevisions: {
            type:Number,
            default:0,
        },

        // Status

        status: {
            type: String,
            enum: [
                "Solved",
                "Needs Revision",
                "Forgotten",
            ],
            default: "Solved",
        },

        isFavorite: {
            type: Boolean,
            default: false,
        },

        solvedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate problem per user

problemSchema.index({
    user: 1,
    problemNumber: 1,
});

// Fast revision queue lookup

problemSchema.index({
    user: 1,
    nextRevisionDate: 1,
});

// Company analytics

problemSchema.index({
    "companies.company": 1,
});

const Problem = mongoose.model(
    "Problem",
    problemSchema
);

export default Problem;