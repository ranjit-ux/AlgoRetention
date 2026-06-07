import React, { useEffect, useState } from 'react'
import AddProblemModal from '@/components/problems/AddProblemModal'
import ProblemTable from '@/components/problems/ProblemTable'
import ProblemFilters from '@/components/problems/ProblemFilters'

import { getProblems } from '@/services/problemApi'

const Problems = () => {

  const [problems,setProblems] = useState([]);
  const [loading,setLoading] = useState(true);

  const [searchTerm,setSearchTerm] = useState("");
  const [difficulty,setDifficulty] = useState("All");
  const [status,setStatus] = useState("All");
  const [topic,setTopic] = useState("All");

  const fetchProblems = async () => {
      try{
        const data = await getProblems();

        setProblems(data.problems);

      }catch(error){
        console.error(error);
      }finally{
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchProblems();

  }, []);

  const topics = [
    ...new Set(problems.map((problem) => problem.topic)),
  ]

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    problem.topic.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
    String(problem.problemNumber).includes(searchTerm);

    const matchesDifficulty = difficulty === "All" || problem.difficulty===difficulty;

    const matchesStatus = status === "All" || problem.status===status;

    const matchesTopic = topic=="All" || problem.topic===topic;

    return (
      matchesSearch &&
      matchesDifficulty &&
      matchesStatus &&
      matchesTopic
    );
  });

  return (
    <div className='space-y-6'>
      <div
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold" >
          Problems
        </h1>
        <AddProblemModal onProblemAdded={fetchProblems} />
      </div>

      <ProblemFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}

        difficulty={difficulty}
        setDifficulty={setDifficulty}

        status={status}
        setStatus={setStatus}

        topic={topic}
        setTopic={setTopic}

        topics={topics}
      />
      <ProblemTable problems={filteredProblems} loading={loading} onProblemUpdated={fetchProblems} />
      
    </div>
  )
}

export default Problems
