import React from 'react';
import Cart from "@/components/cart/Cart";
import ICandidate from "@/interfaces/ICandidate";
import candidates from "@/helpers/candidates";

const Candidates = () => {
  const candidate: ICandidate[] = candidates
  return (
    <div>
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl my-4'>Votations Candidates</h1>
        <p className='mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea aperiam explicabo, possimus voluptatum est impedit labore amet dolorum cumque eligendi perspiciatis iure? Aliquam 
          magni vel ducimus atque itaque beatae molestias.</p>
      </div>
      <div className='grid grid-cols-5'>
        {
          candidate && candidate?.map((candi) => {
            return (
              <div className='flex justify-center my-4'>
                <Cart key={candi.id} {...candi} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Candidates
