
// import { useEffect } from 'react';

// import React from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import '@fortawesome/fontawesome-free/css/all.min.css';

// let myLandbot: any;


// const Footer = () => {


//   return (
//     <div  className='bg-primaryColor flex flex-col items-center py-2 text-cuartiaryColor'>
//       <div className='flex gap-4 md:gap-16'>
//       <Link href="https://www.whatsapp.com/" target="_blank" className="text-white hover:text-gray-300">
//               <i className="fab fa-whatsapp fa-2x"></i>
//             </Link>
//             <Link href="https://facebook.com/" target="_blank" className="text-white hover:text-gray-300">
//               <i className="fab fa-facebook fa-2x"></i>
//             </Link>
//             <Link href="https://x.com/" target="_blank" className="text-white hover:text-gray-300">
//               <i className="fab fa-x fa-2x"></i>
//             </Link>
//             <Link href="https://instagram.com/" target="_blank" className="text-white hover:text-gray-300">
//               <i className="fab fa-instagram fa-2x"></i>
//             </Link>
//             <Link href="https://pinterest.com/" target="_blank" className="text-white hover:text-gray-300">
//               <i className="fab fa-pinterest fa-2x"></i>
//             </Link>
//       </div>
//       <div>
//         <p>© Reservados todos los derechos - 2024</p>
//         <div >
          
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Footer

'use client'
import { useEffect } from 'react';

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import '@fortawesome/fontawesome-free/css/all.min.css';


declare var Landbot: any;
let myLandbot: any;

const Footer = () => {
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.landbot.io/landbot-3/landbot-3.0.0.js';
    script.async = true;
    script.type = 'text/javascript';
    document.head.appendChild(script);

    const handleScriptLoad = function() {
      const initLandbot = function() {
        if (!myLandbot) {
          myLandbot = new Landbot.Livechat({
            configUrl: 'https://storage.googleapis.com/landbot.site/v3/H-2617933-P2CQX19BHAMFR4JH/index.json',
          });
        }
      };

      window.addEventListener('mouseover', initLandbot, { once: true });
      window.addEventListener('touchstart', initLandbot, { once: true });
    };

    script.onload = handleScriptLoad;
  }, []);

  return (
    <div  className='bg-primaryColor flex flex-col items-center py-2 text-cuartiaryColor'>
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
        <div id="landbot-iframe-container"></div>
        <div >
        </div>
      </div>

    </div>
  )
}

export default Footer

