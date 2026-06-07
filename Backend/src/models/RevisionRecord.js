import mongoose from "mongoose";

const revisionRecordSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        problem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Problem",
            required: true,
            index: true,
        },

        // SM-2 Quality Score
        // 5 = Easy
        // 4 = Medium
        // 3 = Hard
        // 0 = Forgot

        quality: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
        },

        intervalBefore: {
            type: Number,
            required: true,
        },

        intervalAfter: {
            type: Number,
            required: true,
        },

        efBefore: {
            type: Number,
            required: true,
        },

        efAfter: {
            type: Number,
            required: true,
        },

        repetitionBefore: {
            type: Number,
            required: true,
        },

        repetitionAfter: {
            type: Number,
            required: true,
        },

        revisionDate: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

revisionRecordSchema.index({
    user: 1,
    revisionDate: -1,
});

revisionRecordSchema.index({
    problem: 1,
    revisionDate: -1,
});

const RevisionRecord = mongoose.model(
    "RevisionRecord",
    revisionRecordSchema
);

export default RevisionRecord;