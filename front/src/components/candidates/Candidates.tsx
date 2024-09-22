import React from 'react';
import Cart from "@/components/candidate/Candidates";
import ICandidate from "@/interfaces/ICandidate";
import { getCandidates } from '@/helpers/candidate.helper';
import Link from 'next/link';

const Candidates = async () => {
  const candidate: ICandidate[] = await getCandidates()
  return (
    <div>
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl my-4'>Votations Candidates</h1>
        <p className='ml-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea aperiam explicabo, possimus voluptatum est impedit labore amet dolorum cumque eligendi perspiciatis iure? Aliquam 
          magni vel ducimus atque itaque beatae molestias.</p>
      </div>
      <div className='grid grid-cols-5'>
        {
          candidate && candidate?.map((candi) => {
            return (
              <div className='flex justify-center my-4'>
                <Link href={`/candidates/${candi.id}`} key={candi.id} >
                  <Cart key={candi.id} {...candi} />
                </Link>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Candidates
