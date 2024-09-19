import React from 'react';
import Image from 'next/image';
import ICandidate from '@/interfaces/ICandidate';


const Cart: React.FC<ICandidate> = (props) => {
 
  return (
    <div className='bg-cuartiaryColor w-52 h-60 relative rounded-xl overflow-hidden drop-shadow-2xl border-2'>
      <div className='absolute top-0 '>
        <Image src="/images/busto.png" alt="imagenBusto" width={200} height={200}/>
      </div>
      <div className='bg-primaryColor py-4 absolute bottom-0 w-full flex flex-col items-center'>
        <h3 className='font-bold text-xl capitalize'>{props.name}</h3>
        <p>{props.grupo}</p>
      </div>
    </div>
  )
}

export default Cart
