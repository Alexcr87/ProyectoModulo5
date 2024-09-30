'use client'
import React from 'react'
import ICandidate from '@/interfaces/ICandidate'
import Image from 'next/image'
import Swal from 'sweetalert2'
import Boton2 from '../ui/Boton2'


const CandidateDetails = async (props:ICandidate) => {
  
  const convertirArreglo = () =>{
    const variable: string[] | undefined =props.proposals

  const resultArray: string[] = typeof variable === 'string' ? JSON.parse(variable) : [];

      return resultArray; 
  }

    const handleVotar = ()=>{
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Votación generada correctamente",
        showConfirmButton: false,
        timer: 1500
      });
    }
    
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='bg-white w-11/12 p-4 flex flex-col items-center rounded-t-2xl drop-shadow-2xl border-2 mt-4'>
        <h1 className='text-2xl font-bold capitalize'>Candidato a Votacion {props.postulation}</h1>
      </div>
      <div className='grid grid-cols-2 w-11/12 justify-center gap-2 h-[65vh]'>
        <div className='bg-white flex justify-center items-center mt-2 drop-shadow-2xl border-2 p-8 rounded-b-2xl'>
            <div className='bg-cuartiaryColor w-80 h-96 relative rounded-xl overflow-hidden drop-shadow-2xl border-2'>
                <div>
                    <Image src={props.imgUrl} alt="fotoCandidato" fill />
                </div>
                <div className='bg-primaryColor py-4 absolute bottom-0 w-full flex flex-col items-center'>
                    <h3 className='font-bold text-xl capitalize text-white'>{props.user.name}</h3>
                    <p className='text-white mb-2'>{props.list}</p>
                    <div>
                      <Boton2 onClick={handleVotar}>Votar</Boton2>
                    </div>
                </div>
            </div>
        </div>
        <div className='bg-white mt-2 drop-shadow-2xl border-2 p-4 rounded-b-2xl'>
            <div className='bg-secundaryColor h-full p-4 rounded-2xl drop-shadow-2xl text-cuartiaryColor'>
                <h2>Propuestas:</h2>
                {
                  convertirArreglo().map((propu, index)=>{
                    return(
                      <p className='ml-4' key={index}>{`${index + 1}. ${propu}`}</p>   
                    )
                  })
                }
            </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateDetails
