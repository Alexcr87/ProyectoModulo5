// app/prueba/page.tsx
import PruebaPageComponent from '@/components/popUpRegister/popUpRegister';
import PoUpSelectRegister from '@/components/popUpSelectRegister/popUpSelectRegister';
import React from 'react';


const PruebaPage = () => {
  return (
    <div>
     {/* <h1>PopUp para el registro</h1> */}
      {/* <PruebaPageComponent /> */}
       <PoUpSelectRegister />
    </div>
  );
};

export default PruebaPage;