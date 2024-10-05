

import { useParams } from 'next/navigation';
import CreateCandidate from "@/components/createCandidate/createCandidate";


import React from 'react'

const CreateCandidateById: React.FC <{params:{id:string}}> = ({params}) => {
    console.log("🚀 ~ constCreateCandidateById:React.FC<{params:{id:string}}>= ~ params:", params)

  return (
    <div className='bg-cuartiaryColor flex justify-center '>
      <CreateCandidate id={params.id} />
    </div>
  );
};

export default CreateCandidateById;


