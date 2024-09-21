import React from 'react';
import Image from 'next/image';
import ICandidate from '@/interfaces/ICandidate';
import IUser from '@/interfaces/IUser';
import { getUsers } from '@/helpers/user.helper';


const Cart: React.FC<ICandidate> = async (props) => {
  const users: IUser[] = await getUsers()

  return (
    <div className='bg-cuartiaryColor w-52 h-60 relative rounded-xl overflow-hidden drop-shadow-2xl border-2'>
      {
        users && users.map((user)=>{
          return(
            <div>
              <div>
                <Image src="/images/busto.png" alt="fotoCandidato" width={200} height={200}/>
              </div>
              <div className='bg-primaryColor py-4 absolute bottom-0 w-full flex flex-col items-center'>
                <h3 className='font-bold text-xl capitalize'>{user.name}</h3>
                <p>{props.list}</p>
              </div>

            </div>
          )   
        })
      }
    
    </div>
  )
}

export default Cart
