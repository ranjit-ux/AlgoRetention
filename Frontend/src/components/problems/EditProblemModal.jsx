import { useEffect, useState } from "react";

import {Dialog,DialogContent,DialogHeader,DialogTitle,} from "../ui/dialog";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import { updateProblem } from "@/services/problemApi";

import { toast } from "sonner";

const EditProblemModal = ({open,setOpen, problem,onSuccess,}) => {

    const [formData,setFormData] = useState({
        title:"",
        topic:"",
        timeComplexity:"",
        spaceComplexity:"",
        notes:"",
    });

    useEffect(() => {
        if(problem){
            setFormData({
                title: problem.title || "",
                topic: problem.topic || "",
                timeComplexity:
                    problem.timeComplexity || "",
                spaceComplexity:
                    problem.spaceComplexity || "",
                notes: problem.notes || "",
            });
        }
    },[problem]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            await updateProblem(
                problem._id,
                formData
            );

            toast.success("Problem updated successfully")

            onSuccess?.();

            setOpen(false);

        }catch(error){
            toast.error("Failed to update problem")
            console.error(error);
        }
    };

    if(!problem) return null;

    return(
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit Problem
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <Input
                        value={formData.title}
                        onChange={(e)=>
                            setFormData({
                                ...formData,
                                title:e.target.value
                            })
                        }
                    />

                    <Input
                        value={formData.topic}
                        onChange={(e)=>
                            setFormData({
                                ...formData,
                                topic:e.target.value
                            })
                        }
                    />

                    <Input
                        value={formData.timeComplexity}
                        onChange={(e)=>
                            setFormData({
                                ...formData,
                                timeComplexity:e.target.value
                            })
                        }
                    />

                    <Input
                        value={formData.spaceComplexity}
                        onChange={(e)=>
                            setFormData({
                                ...formData,
                                spaceComplexity:e.target.value
                            })
                        }
                    />

                    <Textarea
                        value={formData.notes}
                        onChange={(e)=>
                            setFormData({
                                ...formData,
                                notes:e.target.value
                            })
                        }
                    />

                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Save Changes
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditProblemModal;