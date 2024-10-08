// app/prueba/page.tsx

import PopUpRegisterComponent from '@/components/popUpRegister/popUpRegister';
import React from 'react';


const PopUpPage = () => {
  return (
    <div>
      <h1>PopUp para el registro</h1>
      <PopUpRegisterComponent />
    </div>
  );
};

export default PopUpPage;