import Boton from '@/components/boton/Boton';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={500}
        height={500}
        className="mb-4"
      />
     
      <Link href="/">
        <Boton text={'not found'} />
      </Link>
    </div>
  );
}
