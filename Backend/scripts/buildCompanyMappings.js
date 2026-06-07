import fs from "fs";
import path from "path";
import csv from "csv-parser";

const ROOT_PATH =
    "D:/Leetcode-companywise-interview-questions";

const problemsMap = new Map();

const processCompany = (companyName) => {
    return new Promise((resolve, reject) => {
        const csvPath = path.join(
            ROOT_PATH,
            companyName,
            "all.csv"
        );

        if (!fs.existsSync(csvPath)) {
            return resolve();
        }

        fs.createReadStream(csvPath)
            .pipe(csv())
            .on("data", (row) => {
                try {
                    const problemNumber =
                        Number(row.ID);

                    const title =
                        row.Title?.trim();

                    const frequency =
                        Number(
                            String(
                                row["Frequency %"]
                            ).replace(
                                "%",
                                ""
                            )
                        ) || 0;

                    if (
                        !problemNumber ||
                        !title
                    ) {
                        return;
                    }

                    if (
                        !problemsMap.has(
                            problemNumber
                        )
                    ) {
                        problemsMap.set(
                            problemNumber,
                            {
                                problemNumber,
                                title,
                                companies: [],
                            }
                        );
                    }

                    const problem =
                        problemsMap.get(
                            problemNumber
                        );

                    problem.companies.push({
                        company:
                            companyName,
                        frequency,
                    });

                } catch (error) {
                    console.log(error);
                }
            })
            .on("end", resolve)
            .on("error", reject);
    });
};

const build = async () => {
    const companies =
        fs
            .readdirSync(ROOT_PATH)
            .filter((file) =>
                fs
                    .statSync(
                        path.join(
                            ROOT_PATH,
                            file
                        )
                    )
                    .isDirectory()
            );

    console.log(
        `Found ${companies.length} companies`
    );

    for (const company of companies) {
        console.log(
            `Processing ${company}`
        );

        await processCompany(
            company
        );
    }

    const result =
        Array.from(
            problemsMap.values()
        );

    fs.writeFileSync(
        "./companyMappings.json",
        JSON.stringify(
            result,
            null,
            2
        )
    );

    console.log(
        `Generated ${result.length} problems`
    );
};

build();