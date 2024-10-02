import React from 'react'
import Boton from '../ui/Boton'
import Boton2 from '../ui/Boton2'

import { Wallet } from '@mercadopago/sdk-react';
import Account from '@/interfaces/account';

interface PricingTableProps {
  accounts: Account[];
  onPlanSelect: (accountId: number, price: number) => void;
  selectedAccountId: number | null;
  preferenceId: string | null; // Incluye el preferenceId
}

const PricingTable2: React.FC<PricingTableProps> = ({ accounts, onPlanSelect, selectedAccountId, preferenceId }) => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center py-8'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold py-4'>Awesome Pricing Plan</h1>
        <h3 className='pb-4'>
          There are many variations of passages of Lorem Ipsum available <br /> but the majority have suffered alteration in some form.
        </h3>
      </div>
      <div className='flex flex-wrap justify-center w-full mt-8 gap-8 px-4'>
      {accounts.map((account) => (
          <div 
            key={account.id} 
            className={`w-[20vw] duration-300 ease-in-out hover:scale-110 h-auto rounded-3xl py-4 px-16 shadow-2xl border-2 ${selectedAccountId === account.id ? 'bg-primaryColor text-white' : ''}`}
            onClick={() => onPlanSelect(account.id, account.price)} // Aquí se pasa también el precio
          >
            <h2 className='text-lg font-bold mt-8'>{account.name}</h2>
            <h3>$<span className='text-4xl font-bold'>{account.price}</span> Per Month</h3>
            <h2 className='text-lg font-bold mt-12 mb-4'>Features</h2>
          </div>
        ))}
      </div>

      {/* Contenedor del botón de Mercado Pago */}
      {selectedAccountId && preferenceId && (
        <div className='mt-8 flex justify-center'>
          <Wallet initialization={{ preferenceId }} /> {/* Botón centrado */}
        </div>
      )}
    </div>
  );
};

export default PricingTable2