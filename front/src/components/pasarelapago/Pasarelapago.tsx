import Input from '../ui/Input';
import Boton from '../ui/Boton';
import payments from '@/helpers/pasarela.helper';
import PaymentsDetails from '../PaymentmethodsDetails/PaymentmethodsDetails';

const PaymentGateway = () => {
  const paymentArray = payments;

  return (
    <div className='flex flex-row'>
      <div className='my-4 text-center flex flex-col items-center bg-white shadow-lg px-4 rounded-lg'>
        <h1 className='font-bold text-2xl mt-4'>PAGAR</h1>
        <form className="mx-auto px-4 md:px-28 pb-20 rounded-lg"> {/* Ajuste responsivo */}
          <div className="flex flex-col mt-4">
            <Input type="text" name='card' placeholder='Numero Tarjeta' />
          </div>

          <div className="flex flex-col my-4">
            <Input type="text" name='expires' placeholder='Expiracion' />
          </div>

          <div className="flex flex-col my-4">
            <Input type="text" name='CVV' placeholder='CVV' />
          </div>

          <Boton type='submit'>Pagar</Boton>
        </form>

        {paymentArray && paymentArray.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-cuartiaryColor min-h-[82vh]">
            {paymentArray.map((item) => (
              <PaymentsDetails key={item.id} {...item} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PaymentGateway;
