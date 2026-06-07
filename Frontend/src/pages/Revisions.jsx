import React from 'react'
import { useEffect,useState } from 'react'

import RevisionTable from '@/components/revision/RevisionTable'

import { getDueRevisions } from '@/services/problemApi'

const Revisions = () => {
  const [problems,setProblems] = useState([]);

  const [loading,setLoading] = useState(true);

  const fetchRevisions = async () => {
    try{
      const data=await getDueRevisions();

      setProblems(data.problems);
    }catch(error){
      console.error(error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevisions();
  },[]);

  return(
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold'>
        Due Revisions
      </h1>

      <RevisionTable 
        problems={problems} 
        loading={loading} 
        fetchRevisions={fetchRevisions}
      />

    </div>
  );
};

export default Revisions
