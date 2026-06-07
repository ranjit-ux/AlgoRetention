import { useState } from "react";

import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";

import {Dialog,DialogContent,DialogHeader,DialogTitle,} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import ProblemDetailsModal from "./ProblemDetailsModal";

export default function ProblemTable({problems,onProblemUpdated}) {
    const [selectedProblem,setSelectedProblem] = useState(null);

    const [companyDialogOpen,setCompanyDialogOpen] = useState(false);

    const [detailsOpen,setDetailsOpen] = useState(false);

    const openCompanyDialog = (problem) => {
        setSelectedProblem(problem);
        setCompanyDialogOpen(true);
    };

    const getDifficultyBadge = (difficulty) => {
        if (difficulty === "Easy") {
            return (
                <Badge className=" bg-emerald-100 text-emerald-700 border-emerald-200">
                    Easy
                </Badge>
            );
        }

        if (difficulty === "Medium") {
            return (
                <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                    Medium
                </Badge>
            );
        }

        return (
            <Badge
                className=" bg-rose-100 text-rose-700 border-rose-200">
                Hard
            </Badge>
        );
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "Solved":
                return (
                    <Badge className=" bg-emerald-100 text-emerald-700">
                        Solved
                    </Badge>
                );

            case "Forgotten":
                return (
                    <Badge className=" bg-red-100 text-red-700">
                        Forgotten
                    </Badge>
                );

            default:
                return (
                    <Badge variant="outline">
                        New
                    </Badge>
                );
        }
    };

    return (
        <>
            <div className="rounded-xlborder border-slate-200 bg-white overflow-hidden ">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                #
                            </TableHead>

                            <TableHead>
                                Problem
                            </TableHead>

                            <TableHead>
                                Difficulty
                            </TableHead>

                            <TableHead className="w-[320px]">
                                Companies
                            </TableHead>

                            <TableHead >
                                Link
                            </TableHead>

                            <TableHead>
                                Next Revision
                            </TableHead>

                            <TableHead>
                                Status
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {problems?.length ===
                        0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="text-centerpy-10 text-slate-500"
                                >
                                    No problems added yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            problems?.map((problem) => (
                                    <TableRow key={problem._id}>
                                        <TableCell>
                                            {problem.problemNumber}
                                        </TableCell>

                                        <TableCell>
                                            <div
                                                className="cursor-pointer hover:text-blue-600"
                                                onClick={() => {
                                                    setSelectedProblem(problem);
                                                    setDetailsOpen(true);
                                                }}
                                            >
                                                <p className="font-medium text-slate-900">
                                                    {problem.title}
                                                </p>

                                                <p className="text-xs text-slate-500">
                                                    {problem.topic}
                                                </p>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            {getDifficultyBadge(
                                                problem.difficulty
                                            )}
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex flex-wrap gap-1 max-w-[300px]">
                                                {problem.companies?.slice(0,5).map((company) => (
                                                        <Badge
                                                            key={company.company}
                                                            variant="secondary"
                                                        >
                                                            {company.company}
                                                        </Badge>
                                                    )
                                                )}

                                                {problem.companies?.length >5 && (
                                                    <Badge
                                                        variant="outline"
                                                        className="cursor-pointer hover:bg-slate-100"
                                                        onClick={() =>openCompanyDialog(problem)}
                                                    >
                                                        +
                                                        {problem.companies.length - 5}
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>

                                        <TableCell >
                                            <a 
                                                href={problem.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex transition hover:scale-110 hover:opacity-80"
                                            >
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png?_=20191202080835" alt="leetcode" className="h-6 w-6" />
                                            </a>
                                        </TableCell>

                                        <TableCell>
                                            {problem.nextRevisionDate ? new Date(problem.nextRevisionDate).toLocaleDateString(): "-"}
                                        </TableCell>

                                        <TableCell>
                                            {getStatusBadge(problem.status)}
                                        </TableCell>
                                    </TableRow>
                                )
                            )
                        )}
                    </TableBody>
                </Table>
            </div>

            <ProblemDetailsModal 
                open={detailsOpen}
                setOpen={setDetailsOpen}
                problem={selectedProblem}
                onProblemUpdated={onProblemUpdated}
            />

            <Dialog
                open={companyDialogOpen}
                onOpenChange={setCompanyDialogOpen}
            >
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            Companies Asking
                            This Question
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-wrap gap-2 max-h-[400px] overflow-y-auto">
                        {selectedProblem?.companies?.map((company) => (
                                <Badge
                                    key={company.company}
                                    variant="secondary"
                                >
                                    {company.company}
                                </Badge>
                            )
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}