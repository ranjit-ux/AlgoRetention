import React from 'react'
import { useState } from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

import { createProblem } from '@/services/problemApi'

import { Badge } from '../ui/badge'

import { toast } from "sonner";

const AddProblemModal = ({onProblemAdded }) => {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    problemNumber: "",
    title: "",
    difficulty: "",
    topic: "",
    link: "",
    notes: "",
    timeComplexity: "",
    spaceComplexity: "",
  });

  const [loading,setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value,});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        setLoading(true);

        await createProblem(formData);

        setFormData({
            problemNumber: "",
            title: "",
            difficulty: "",
            topic: "",
            link: "",
            notes: "",
            timeComplexity: "",
            spaceComplexity: "",
        });

        toast.success("Problem added successfully");

        setOpen(false);

        if(onProblemAdded ){
            onProblemAdded ();
        }
    }catch(error){
        toast.error("Failed to add problem");
        console.error(error);
    }finally{
        setLoading(false);
    }
  };


  return(
    <Dialog
        open={open}
        onOpenChange={setOpen}
    >
        <DialogTrigger asChild>
            <Button>
                + Add Problem
            </Button>
        </DialogTrigger>

        <DialogContent className="max-w-3xl rounded-3xl">
            <DialogHeader>
                <DialogTitle>
                    Add New Problem
                </DialogTitle>
            </DialogHeader>

            <form 
                onSubmit={handleSubmit}
                className="space-y-4 mt-4"
            >
                <Input
                    name="problemNumber"
                    placeholder="Leetcode Problem Number"
                    value={formData.problemNumber}
                    onChange={handleChange}
                />
                <p className="text-xs text-slate-500 -mt-3">*Used to fetch company frequency data automatically.
                </p>
                <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200">
                    Company Mapping Enabled
                </Badge>

                <Input
                    name="title"
                    placeholder="Problem Title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <Select
                    value={formData.difficulty}
                    onValueChange={(value) => setFormData({
                        ...formData,difficulty:value
                    })}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="Easy">
                            Easy
                        </SelectItem>

                        <SelectItem value="Medium">
                            Medium
                        </SelectItem>

                        <SelectItem value="Hard">
                            Hard
                        </SelectItem>
                    </SelectContent>
                </Select>

                <Input
                    name="topic"
                    placeholder="Topic"
                    value={formData.topic}
                    onChange={handleChange}
                />

                <Input
                    name="link"
                    placeholder="Leetcode Link"
                    value={formData.link}
                    onChange={handleChange}
                />

                <Input 
                    name="timeComplexity"
                    placeholder="Time Complexity"
                    value={formData.timeComplexity}
                    onChange={handleChange}
                />

                <Input
                    name="spaceComplexity"
                    placeholder="Space Complexity"
                    value={formData.spaceComplexity}
                    onChange={handleChange}
                />

                <Textarea
                    name="notes"
                    placeholder="Notes"
                    value={formData.notes}
                    onChange={handleChange}
                />

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                >
                    {loading ? "Saving..." : "Save     "}
                </Button>
            </form>
        </DialogContent>

    </Dialog>
  );
};

export default AddProblemModal
