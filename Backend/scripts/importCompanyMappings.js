import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import CompanyQuestionMapping from "../src/models/CompanyQuestionMapping.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mappings = JSON.parse(
    fs.readFileSync("./companyMappings.json","utf-8")
);

dotenv.config();

const importMappings = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB Connected");

        await CompanyQuestionMapping.deleteMany({});

        console.log("Old mappings deleted");

        await CompanyQuestionMapping.insertMany(
            mappings,
            {
                ordered: false,
            }
        );

        console.log(
            `Imported ${mappings.length} mappings`
        );

        process.exit(0);

    } catch (error) {

        console.error(error);

        process.exit(1);
    }
};

importMappings();