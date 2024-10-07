
// Pasarela de pago desde el front usando Checkout Pro:
// 1.	Ingresar a mercado pago, crear un usuario y posteriormente crear una aplicación
// 2.	 Npm install mercadopago (instalo libreria)
// 3.	Crear el formulario del monto y un mensaje para probar
// 4.	Crear una tarjeta de pruebas en la aplicion, se supone que en esta intancia ya estas en el sandbox de mercadolibre

// deben usar webhook creando una ruta con cloudeufer pero primero hay que resolver el direccionamiento al sandbox
// al parecer ahora no se declara de esta manera 'import { initMercadoPago } from '@mercadopago/sdk-js''


import Input from '../ui/Input';
import Boton from '../ui/Boton';
 //import { useEffect } from 'react';
// sdk de mercadopago
import {MercadoPagoConfig, Preference} from 'mercadopago';
// import { initMercadoPago } from '@mercadopago/sdk-js';
import payments from '@/helpers/pasarela.helper';
import PaymentsDetails from '../PaymentmethodsDetails/PaymentmethodsDetails';

// const mercadopago = initMercadoPago('PUBLIC_KEY_MERCADOPAGO');

const paymentGateway =  () => {
//useEffect (() =>{
  const paymentArray =  payments;
  // SetErrors (errors)
  //}, [])

    return (
      <div className='flex flex-row'>
        <div className='my-4 text-center flex flex-col items-center bg-white shadow-lg px-4 rounded-lg'>

        <h1 className='font-bold text-2xl mt-4'>PAGAR</h1>
        <form 
          className="mx-auto px-28 pb-20 rounded-lg"
        >

           <div className="flex flex-col mt-4">
            
            <Input
              type="text"
              name='card'
              placeholder='Numero Tarjeta'
            />
            </div>
    
    <div className="flex flex-col my-4">
            <Input
              type="text"
              name='expires'
              placeholder='Expiracion'
            />
        </div>

        <div className="flex flex-col my-4">
            <Input
              type="text"
              name='CVV'
              placeholder='CVV'
            />
        </div>

          <Boton 
            type='submit'>
              Pagar
          </Boton>
       
        </form>

        

{paymentArray && paymentArray.length > 0 ? (
  paymentArray.map((item) => {
    return (
      <div className="grid grid-cols-5 bg-cuartiaryColor min-h-[82vh]">
        <PaymentsDetails key={item.id} {...item} />
      </div>
    )
  })
) : null}
        </div>

  
</div>
        
)
    }


export default paymentGateway


