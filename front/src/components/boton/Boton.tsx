'use client'
import React from 'react';
import Link from 'next/link';

interface BotonProps {
  text: string;
  link?: string;
  onClick?: () => void; 
}

const Boton: React.FC<BotonProps> = ({ text, link, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(); 
    }
  };

  if (link) {
    return (
      <div className='bg-tertiaryColor text-cuartiaryColor py-2 px-8 w-32 flex justify-center rounded-full uppercase hover:scale-105' 
            onClick={handleClick} >
        <Link href={link} passHref>
          <p>{text}</p>
        </Link>
      </div>
    );
  }

  return (
    <button
      className='bg-tertiaryColor text-cuartiaryColor py-2 px-8 w-32 flex justify-center rounded-full uppercase hover:scale-105'
      onClick={handleClick} 
    >
      {text}
    </button>
  );
};

export default Boton;

