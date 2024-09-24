"use client";

import React from 'react';

const guia=()=>{
return(
  <div className="relative h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/premium-zdjecie/wyborczyni-wkladajaca-kartke-do-urny-wyborczej-wybory-i-koncepcja-glosowania_77190-18358.jpg')" }}>
 
  <div className="absolute inset-0 bg-black opacity-50"></div>

  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
    <h1 className="text-4xl font-bold mb-6">
      PROXIMAMENTE
    </h1>
  </div>
</div>
)
}

export default guia


