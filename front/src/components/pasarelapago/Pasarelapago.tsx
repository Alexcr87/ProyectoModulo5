
// Pasarela de pago desde el front usando Checkout Pro:
// 1.	Ingresar a mercado pago, crear un usuario y posteriormente crear una aplicación
// 2.	 Npm install mercadopago (instalo libreria)
// 3.	Crear el formulario del monto y un mensaje para probar
// 4.	Crear una tarjeta de pruebas en la aplicion, se supone que en esta intancia ya estas en el sandbox de mercadolibre

// deben usar webhook creando una ruta con cloudeufer pero primero hay que resolver el direccionamiento al sandbox
// al parecer ahora no se declara de esta manera 'import { initMercadoPago } from '@mercadopago/sdk-js''


import Input from '../ui/Input';
import Boton from '../ui/Boton';
// sdk de mercadopago
import {MercadoPagoConfig, Preference} from 'mercadopago';


// const APIMERCADOPAGO: string | undefined = process.env.TOKEN_MERCADOPAGO;
const client = new MercadoPagoConfig ({accessToken:  'APP_USR-6145939558841086-092714-258b64f712d95d88d6549e2adbf0b9ca-2009325818' })

async function pago(formData: FormData) {
    'use server'
    const preference = await new Preference (client).create ({
   body: {
    items: [
        {
        id: 'pepito como dice christian',
        title: formData.get ('coment') as string,
        quantity: 1,
        unit_price: Number (formData.get ('amount')),
 },  
 ],
   },
});

redirect(preference.sandbox_init_point!); // aqui deberia carga el sandbox y deberia recibir la prefencia pero genera este error

}


const PasarelaPago = ()  => {

    return (
        <div className='my-4 text-center flex flex-col items-center bg-white shadow-lg px-4 rounded-lg'>

        <h1 className='font-bold text-2xl mt-4'>PAGAR</h1>
        <form  action={pago}
          className="mx-auto px-28 pb-20 rounded-lg"
        >

           <div className="flex flex-col mt-4">
            
            <Input
              type="number"
              name='amount'
            />
            </div>
    
    <div className="flex flex-col my-4">
            <Input
              type="text"
              name='coment'
            />
        </div>
          <Boton 
            type='submit'>
              Pagar
          </Boton>
         
        </form>
        </div>
      );


}

export default PasarelaPago


// import { useState } from 'react';
// import { MercadoPagoConfig, Preference } from 'mercadopago';

// const PasarelaPago = () => {
//   const [amount, setAmount] = useState('');
//   const [coment, setComent] = useState('');
//   const [error, setError] = useState(null);

//   const client = new MercadoPagoConfig({
//     accessToken: 'APP_USR-6145939558841086-092714-258b64f712d95d88d6549e2adbf0b9ca-2009325818',
//   });

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     try {
//       const preference = await new Preference(client).create({
//         body: {
//           items: [
//             {
//               id: 'pepito como dice christian',
//               title: coment,
//               quantity: 1,
//               unit_price: Number(amount),
//             },
//           ],
//         },
//       });
//       window.location.href = preference.sandbox_init_point;
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="my-4 text-center flex flex-col items-center bg-white shadow-lg px-4 rounded-lg">
//       <h1 className="font-bold text-2xl mt-4">PAGAR</h1>
//       <form onSubmit={handleSubmit} className="mx-auto px-28 pb-20 rounded-lg">
//         <div className="flex flex-col mt-4">
//           <Input
//             type="number"
//             name="amount"
//             value={amount}
//             onChange={(event) => setAmount(event.target.value)}
//           />
//         </div>
//         <div className="flex flex-col my-4">
//           <Input
//             type="text"
//             name="coment"
//             value={coment}
//             onChange={(event) => setComent(event.target.value)}
//           />
//         </div>
//         <Boton type="submit">Pagar</Boton>
//         {error && <div style={{ color: 'red' }}>{error}</div>}
//       </form>
//     </div>
//   );
// };

// export default PasarelaPago;