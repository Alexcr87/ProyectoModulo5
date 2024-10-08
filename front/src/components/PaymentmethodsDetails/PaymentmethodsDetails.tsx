//'use client'
import IPasarela from '@/interfaces/IPasarela'
import React from 'react'
import Image from 'next/image'


const PaymentsDetails = async (props:IPasarela) => {

    
  return (
    <div className='w-full flex flex-auto items-center'>
      <div className='bg-white w-11/12 p-4 flex flex-col items-center rounded-t-2xl drop-shadow-2xl border-2 mt-4'>
        <h1 className='text-2xl font-bold capitalize text-tertiaryColor'> {props.name}</h1>
      </div>
      <div className='grid grid-cols-2 w-11/12 justify-center gap-2 h-[65vh]'>
        <div className='bg-white flex justify-center items-center mt-2 drop-shadow-2xl border-2 p-8 rounded-b-2xl'>
            <div className='bg-cuartiaryColor w-80 h-96 relative rounded-xl overflow-hidden drop-shadow-2xl border-2'>
                <div>
                    {/* <Image src={props.thumbnail} alt="metodo de pago" /> */}
                    <img src="https://http2.mlstatic.com/storage/logos-api-admin/0daa1670-5c81-11ec-ae75-df2bef173be2-xl@2x.png" width={200}/>
                </div>
                
                {/* <div className='bg-primaryColor py-4 absolute bottom-0 w-full flex flex-col items-center'>
                    <h3 className='font-bold text-xl capitalize'>{props.}</h3>
                    <button
                    className='bg-tertiaryColor text-cuartiaryColor rounded-full px-12 py-2 hover:scale-105 hover:bg-secundaryColor ease-in-out duration-300 hover:text-tertiaryColor'
                    onClick={handleVotar}
                    >Votar</button>
                </div> */}
            </div>
        </div>
        {/* <div className='bg-white mt-2 drop-shadow-2xl border-2 p-4 rounded-b-2xl'>
            <div className='bg-secundaryColor h-full p-4 rounded-2xl drop-shadow-2xl text-cuartiaryColor'>
                <h2>Propuestas:</h2>
                <p className='ml-4'>{props.proposals}</p>   
            </div>
        </div> */}
      </div>
    </div>
  )
}

export default PaymentsDetails
