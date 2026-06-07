import React from 'react'
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from '../ui/table'
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useState } from 'react';
import RevisionModal from './RevisionModal';

const RevisionTable = ({ problems, loading, fetchRevisions }) => {

    const [selectProblem,setSelectProblem] = useState(null);
    const [open,setOpen] = useState(false);

    if (loading) {
        return <div>Loading...</div>;
    }

    if(!loading && problems.length === 0){
        return(
            <div className="border rounded-xl p-12 text-center">
                <h2 className="text-2xl font-bold">
                    🎉 No revisions due today
                </h2>
                <p className="text-muted-foreground mt-2">
                    Great job! You're all caught up.
                </p>
            </div>
        );
    }

    return (
        <>
        <div className="border rounded-xl overflow-hidden">

            <Table>

                <TableHeader>
                    <TableRow>
                        <TableHead>Problem</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Link</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>

                    {problems.map((problem) => (

                        <TableRow key={problem._id}>

                            <TableCell>
                                <div>
                                    <p className="font-semibold">
                                        {problem.title}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        {problem.topic}
                                    </p>
                                </div>
                            </TableCell>

                            <TableCell>
                                <Badge>
                                    {problem.difficulty}
                                </Badge>
                            </TableCell>

                            <TableCell>
                                {new Date(
                                    problem.nextRevisionDate
                                ).toLocaleDateString()}
                            </TableCell>

                            <TableCell>

                                <a
                                    href={problem.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex transition hover:scale-110"
                                >
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
                                        alt="leetcode"
                                        className="h-6 w-6"
                                    />
                                </a>

                            </TableCell>

                            <TableCell>

                                <Button
                                    onClick={() => {
                                        setSelectProblem(problem);
                                        setOpen(true);
                                    }}
                                >
                                    Revise
                                </Button>

                            </TableCell>

                        </TableRow>

                    ))}

                </TableBody>

            </Table>

        </div>
        <RevisionModal 
                open={open}
        setOpen={setOpen}
        problem={selectProblem}
        onRevisionComplete={
            fetchRevisions
        }    
        />
        </>
    );
};

export default RevisionTable;
