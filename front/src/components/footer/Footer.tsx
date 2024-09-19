import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className='bg-primaryColor flex flex-col items-center py-2 text-cuartiaryColor'>
      <div className='flex gap-16'>
        <Image className='' src="/images/whatsapp.svg" alt="logoWhatsapp" width={45} height={45} />
        <Image src="/images/github.svg" alt="logogithub" width={45} height={45} />
        <Image src="/images/facebook.svg" alt="logofacebook" width={45} height={45} />
      </div>
      <div>
        <p>© Reservados todos los derechos - 2024</p>
      </div>
    </div>
  )
}

export default Footer
