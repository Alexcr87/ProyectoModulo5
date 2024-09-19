import React from 'react';
import Cart from "@/components/cart/Cart";
import ICandidate from "@/interfaces/ICandidate";
import candidates from "@/helpers/candidates";

const Candidates = () => {
  const candidate: ICandidate[] = candidates
  return (
    <div className='grid grid-cols-4'>
       {
          candidate && candidate?.map((candi)=>{
            return(
              <div className='flex justify-center mt-4'>
                <Cart key={candi.id} {...candi}/>
              </div>
            )
          })
        }
    </div>
  )
}

export default Candidates
