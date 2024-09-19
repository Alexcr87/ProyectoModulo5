import React from 'react';
import Image from 'next/image';
import ICandidate from '@/interfaces/ICandidate';
import IUser from '@/interfaces/IUser';
import usersR from "@/helpers/users"


const Cart: React.FC<ICandidate> = (props) => {
  const users: IUser[] = usersR
  return (
    <div className='bg-cuartiaryColor w-52 h-60 relative rounded-xl overflow-hidden drop-shadow-2xl border-2'>
      {
        users.map((user)=>{
          if(user.id === props.id){
            return(
            <>
              <div className='absolute top-0 '>
                <Image src="/images/busto.png" alt="imagenBusto" width={200} height={200}/>
              </div>
              <div className='bg-primaryColor py-4 absolute bottom-0 w-full flex flex-col items-center'>
                <h3 className='font-bold text-xl capitalize'>{user.name}</h3>
                <p>{props.list}</p>
              </div>
            </>
          )
          }
        })
      }
    </div>
  )
}

export default Cart
