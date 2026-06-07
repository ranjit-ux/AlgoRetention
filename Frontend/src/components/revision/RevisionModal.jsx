import {Dialog,DialogContent,DialogHeader,DialogTitle,} from "@/components/ui/dialog";

import { Button }
from "@/components/ui/button";

import { revisionProblem }
from "@/services/revisionApi";
import { useEffect, useState } from "react";

const RevisionModal = ({open,setOpen,problem,onRevisionComplete}) => {

    if (!problem) return null;

    const [isRevised,setIsRevised] = useState(true);

    useEffect(()=>{
        if(open){
            setIsRevised(false);
        }
    },[open]);

    const handleReview = async (quality) => {
        console.log(problem);
        try {

            await revisionProblem(
                problem._id,
                quality
            );

            onRevisionComplete?.();

            setOpen(false);

        } catch (error) {

            console.error(error);
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent className="sm:max-w-md rounded-3xl">
                <DialogHeader>
                    <DialogTitle>
                        Complete Revision
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-2">
                    <div className="flex items-center gap-3">
                        <input 
                            type="checkbox" 
                            checked={isRevised}
                            onChange={(e) => setIsRevised(e.target.checked)}
                            className="h-4 w-4 cursor-pointer"
                        />
                        <span className="text-sm font-medium">
                            I revised this problem
                        </span>
                    </div>

                    <div className="pt-2">
                        <p className="font-medium mb-3 text-center">
                            How well did you remember?
                        </p>

                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                disabled={!isRevised}
                                variant="destructive"
                                onClick={() =>
                                    handleReview(0)
                                }
                            >
                                Again
                            </Button>

                            <Button
                                disabled={!isRevised}
                                variant="secondary"
                                onClick={() =>
                                    handleReview(3)
                                }
                            >
                                Hard
                            </Button>

                            <Button
                                disabled={!isRevised}
                                className="
                                bg-amber-500
                                hover:bg-amber-600
                                "
                                onClick={() =>
                                    handleReview(4)
                                }
                            >
                                Good
                            </Button>

                            <Button
                                disabled={!isRevised}
                                className="
                                bg-emerald-500
                                hover:bg-emerald-600
                                "
                                onClick={() =>
                                    handleReview(5)
                                }
                            >
                                Easy
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default RevisionModal;