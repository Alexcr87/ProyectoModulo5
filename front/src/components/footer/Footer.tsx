import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <div className='bg-primaryColor flex flex-col items-center py-2 text-cuartiaryColor'>
      <div className='flex gap-16'>
      <Link href="https://www.whatsapp.com/" target="_blank" className="text-white hover:text-gray-300">
              <i className="fab fa-whatsapp fa-2x"></i>
            </Link>
            <Link href="https://facebook.com/" target="_blank" className="text-white hover:text-gray-300">
              <i className="fab fa-facebook fa-2x"></i>
            </Link>
            <Link href="https://x.com/" target="_blank" className="text-white hover:text-gray-300">
              <i className="fab fa-x fa-2x"></i>
            </Link>
            <Link href="https://instagram.com/" target="_blank" className="text-white hover:text-gray-300">
              <i className="fab fa-instagram fa-2x"></i>
            </Link>
            <Link href="https://pinterest.com/" target="_blank" className="text-white hover:text-gray-300">
              <i className="fab fa-pinterest fa-2x"></i>
            </Link>
      </div>
      <div>
        <p>© Reservados todos los derechos - 2024</p>
      </div>
    </div>
  )
}

export default Footer
