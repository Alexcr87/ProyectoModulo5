'use client'
import React from 'react';
import Link from 'next/link';

interface BotonProps {
  text: string,
  link?: string,
  type?: 'button' | 'submit' | 'reset',
  onClick?: () => void
}

const Boton: React.FC<BotonProps> = ({ text, link, type, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(); 
    }
  };

  if (link) {
    return (
      <div className='bg-tertiaryColor text-cuartiaryColor py-2 px-8 flex justify-center rounded-full hover:scale-105 hover:bg-primaryColor' 
            onClick={handleClick} >
        <Link href={link} passHref>
          <p>{text}</p>
        </Link>
      </div>
    );
  }

  return (
    <button
      type={type}
      className='bg-tertiaryColor text-cuartiaryColor py-2 px-8 flex justify-center rounded-full hover:scale-105 hover:bg-primaryColor duration-300'
      onClick={handleClick} 
    >
      {text}
    </button>
  );
};

export default Boton;

