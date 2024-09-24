
'use client'
import { useParams } from 'next/navigation';
import CreateCandidate from "@/components/createCandidate/createCandidate";

const CreateCandidateById = () => {
  const { id } = useParams<{ id: string }>(); 

  const userId = Array.isArray(id) ? id[0] : id; 

  return (
    <div>
      <CreateCandidate userId={userId} />
    </div>
  );
};

export default CreateCandidateById;
