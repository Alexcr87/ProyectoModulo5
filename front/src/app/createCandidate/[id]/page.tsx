
"use client"
import { useParams, useRouter } from 'next/navigation';
import CreateCandidate from "@/components/createCandidate/createCandidate";


import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/Authontext';
import NotFound from '@/app/not-found';

const CreateCandidateById: React.FC <{params:{id:string}}> = ({params}) => {

  const { userData } = useAuth();
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const roles = userData?.userData?.roles?.map((item) => item.id);
    if (!roles || (!roles.includes(1) && !roles.includes(4))) {
      router.push("/login");
    } else {
      setIsVerified(true); // Permitir que el componente se renderice
    }
  }, [userData, router]);

  if (!isVerified) {
    return (NotFound())// Mostrar nada mientras se verifica
  }

  return (
    <div className='bg-cuartiaryColor flex justify-center items-center h-[85vh] '>
      <CreateCandidate id={params.id} />
    </div>
  );
};

export default CreateCandidateById;


