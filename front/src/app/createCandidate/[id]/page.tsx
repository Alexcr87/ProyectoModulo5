
'use client'
import { useParams } from 'next/navigation';
import CreateCandidate from "@/components/createCandidate/createCandidate";

const CreateCandidateById = () => {

  return (
    <div className='bg-cuartiaryColor flex justify-center '>
      <CreateCandidate />
    </div>
  );
};

export default CreateCandidateById;


