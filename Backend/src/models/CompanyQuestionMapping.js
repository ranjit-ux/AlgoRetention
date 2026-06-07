import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
            trim: true,
        },

        frequency: {
            type: Number,
            default: 0,
        },
    },
    {
        _id: false,
    }
);

const companyQuestionMappingSchema =
    new mongoose.Schema(
        {
            problemNumber: {
                type: Number,
                required: true,
                unique: true,
                index: true,
            },

            title: {
                type: String,
                required: true,
                trim: true,
            },

            companies: [companySchema],
        },
        {
            timestamps: true,
        }
    );

const CompanyQuestionMapping =
    mongoose.model(
        "CompanyQuestionMapping",
        companyQuestionMappingSchema
    );

export default CompanyQuestionMapping;