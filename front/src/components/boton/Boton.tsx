import React from 'react';
import Link from 'next/link';

interface BotonProps {
  text: string;
  link: string;
}

const Boton: React.FC<BotonProps> = ({ text, link }) => {
  return (
    <Link href={`/${link}`}>
      <p className='bg-tertiaryColor text-cuartiaryColor py-2 px-8 w-32 flex justify-center rounded-full uppercase'>{text}</p>
    </Link>
  );
};

export default Boton;
