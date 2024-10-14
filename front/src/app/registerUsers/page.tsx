// app/prueba/page.tsx
import PruebaPageComponent from '@/components/popUpRegister/popUpRegister';
import PopUPSelectRegister from '@/components/popUpSelectRegister/popUpSelectRegister';
import React from 'react';


const PruebaPage = () => {
  return (
    <div>
     {/* <h1>PopUp para el registro</h1>
      <PruebaPageComponent /> */}
      <PopUPSelectRegister/>

    </div>
  );
};

export default PruebaPage;