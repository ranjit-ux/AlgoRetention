import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useState } from "react";

import { deleteProblem } from "@/services/problemApi";
import EditProblemModal from "./EditProblemModal";
import { toast } from "sonner";

const ProblemDetailsModal = ({open,setOpen,problem,onProblemUpdated}) => {
    if(!problem) return null;

    const [editOpen,setEditOpen] = useState(false);

    const handleDelete = async () => {
        const confirmed = window.confirm("Delete this problem permanently?");

        if(!confirmed) return;

        try{
            await deleteProblem(problem._id);

            toast.success("Problem deleted successfully");

            setOpen(false);
            onProblemUpdated?.();
        }catch(error){
            toast.error("Failed to delete problem");
            console.error(error);
        }
    }

    return(
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center border-b pb-3">

                
                {/* <DialogHeader> */}
                    <DialogTitle>
                        {problem.title}
                    </DialogTitle>

                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick = {() => setEditOpen(true)}
                        >
                            Edit
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </div>
                    

                {/* </DialogHeader> */}
                </div>

                <div className="space-y-6">
                    <div>
                        <p className="font-medium">
                            Topic
                        </p>
                        <p className="text-slate-600">
                            {problem.topic}
                        </p>
                    </div>

                    <div>
                        <p className="font-medium">
                            Notes
                        </p>
                        <div className="bg-slate-50 rounded-lg p-3 mt-1">
                            {problem.notes || "No notes added"}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="font-medium">
                                Time Complexity
                            </p>

                            <p>
                                {problem.timeComplexity || "-"}
                            </p>
                        </div>

                        <div>
                            <p className="font-medium">
                                Space Complexity
                            </p>
                            <p>
                                {problem.spaceComplexity || "-"}  
                            </p>
                        </div>

                        <div>
                            <p className="font-medium">
                                Revision Count
                            </p>
                            <p>
                                {problem.revisionCount || 0}
                            </p>
                        </div>

                        <div>
                            <p className="font-medium">
                                Retention Score
                            </p>
                            <p>
                                {problem.retentionScore || 0}%
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="font-medium">
                                Last Revision
                            </p>
                            <p>
                                {problem.lastRevisionDate ? new Date(problem.lastRevisionDate).toLocaleDateString() : "-"}
                            </p>
                        </div>

                        <div>
                            <p className="font-medium"> 
                                Next Revision 
                            </p>
                            <p>
                                {problem.nextRevisionDate ? new Date(problem.nextRevisionDate).toLocaleDateString() : "-"}
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="font-medium mb-2">
                            Companies ({problem.companies?.length || 0})
                        </p>
                        <div className="flex flex-wrap gap-2 max-h-[180px] overflow-y-auto border rounded-lg p-3 bg-slate-50">
                            {problem.companies?.map((company) => (
                                <Badge
                                    key={company.company}
                                    variant="secondary"
                                >
                                    {company.company}
                                </Badge>
                            ))}
                        </div>
                    </div>

                </div>
            </DialogContent>
            <EditProblemModal
                open={editOpen}
                setOpen={setEditOpen}
                problem={problem}
                onSuccess={onProblemUpdated}
            />
        </Dialog>
    )
}

export default ProblemDetailsModal;