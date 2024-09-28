import React from 'react'
import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.min.css';
import teamMembers from '@/helpers/teamMembers.helper';
import IMember from '@/interfaces/IMember';

const TeamMembers = () => {
    const team: IMember[] = teamMembers
  return (
    <div className='bg-primaryColor pb-6'>
        <div className='text-white flex flex-col items-center mb-6'>
            <h1 className='text-4xl font-bold py-8'>Our Creative Team</h1>
            <p>There are many variations of passages of Lorem Ipsum</p>
            <p> available but the majority have suffered alteration in some form.</p>
        </div>
        <div className='grid grid-cols-3 justify-items-center gap-6'>
            {
                teamMembers && teamMembers.map((member)=>{
                    return(
                    <div className='w-[300px] h-auto bg-white flex flex-col items-center p-8 rounded-2xl relative group hover:scale-105'>
                        <div className='bg-tertiaryColor w-20 h-20 absolute rounded-full top-15 left-10 opacity-0 group-hover:opacity-100'></div>
                        <div className='w-[200px] h-[200px] rounded-full overflow-hidden z-10'>
                            <img src={member.image} alt={`Foto perfil de ${member.name}`} />
                        </div>
                        <h2 className='text-2xl font-bold'>{member.name}</h2>
                        <p>{member.profession}</p>
                        <div className='flex gap-4 mt-2'>
                            <Link href={member.linkFacebook} target="_blank" className="hover:text-primaryColor text-gray-300">
                                <i className="fab fa-facebook fa-2x"></i>
                            </Link>
                            <Link href={member.linkGitHub} target="_blank" className="hover:text-black text-gray-300">
                                <i className="fab fa-github fa-2x"></i>
                            </Link>
                            <Link href={member.linkLinkedIn} target="_blank" className="hover:text-primaryColor text-gray-300">
                                <i className="fab fa-linkedin fa-2x"></i>
                            </Link>
                        </div>
                    </div>
                    )
                })
            }
            
        </div>
    </div>
  )
}

export default TeamMembers
