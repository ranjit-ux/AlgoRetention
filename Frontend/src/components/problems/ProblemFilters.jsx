import React from 'react'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger,SelectValue } from '../ui/select'


const ProblemFilters = ({searchTerm,setSearchTerm, difficulty,setDifficulty,status,setStatus,topic,setTopic,topics}) => {
  return (
    <div className='grid md:grid-cols-4 gap-4'>
      <Input 
        placeholder="Search problem..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-500 whitespace-nowrap">
            Difficulty:
        </span>
      <Select
        value={difficulty}
        onValueChange={setDifficulty}
      >
        <SelectTrigger>
          <SelectValue placeholder="Difficulty"/>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="All">
            Difficulty: All
          </SelectItem>

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
      
      </div>
      <div className="flex items-center gap-2">
      <span className="text-sm text-slate-500 whitespace-nowrap">
        Status:
    </span>
      <Select
        value={status}
        onValueChange={setStatus}
      >
        <SelectTrigger>
            <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
            <SelectItem value="All">
                Status: All
            </SelectItem>

            <SelectItem value="Solved">
                Solved
            </SelectItem>

            <SelectItem value="Forgotten">
                Forgotten
            </SelectItem>

            <SelectItem value="New">
                New
            </SelectItem>
        </SelectContent>
      </Select>
      </div>

      <div className="flex items-center gap-2">

      <span className="text-sm text-slate-500 whitespace-nowrap">
        Topic:
    </span>
      <Select 
        value={topic}
        onValueChange={setTopic}
      >
        <SelectTrigger>
          <SelectValue placeholder="Topic" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="All">
            Topics: All
          </SelectItem>

          {topics.map((topic) => (
            <SelectItem 
              key={topic}
              value={topic}
            >
              {topic}
            </SelectItem>
          ))}

        </SelectContent>
      </Select>
      </div>
    </div>
  );
};

export default ProblemFilters;
