"use client"

import React, { useEffect, useState } from 'react'
import Boton from '../ui/Boton'
import Boton2 from '../ui/Boton2'

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import Account from '@/interfaces/account';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const APIURL = process.env.NEXT_PUBLIC_API_URL

interface PricingTableProps {
  accounts: Account[];
  onPlanSelect: (accountId: number, price: number) => void;
  selectedAccountId: number | null;
  preferenceId: string | null; // Incluye el preferenceId
}
 

const PricingTable = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [preferenceId, setPreferenceId] = useState('');
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);
  useEffect(() => {
    

    if (!apiKey) {
      console.error('La clave pública de Mercado Pago no está definida en las variables de entorno.');
      return;
    }

    const fetchAccounts = async () => {
      try {
        const response = await fetch(`${APIURL}/payments/packages`);
        if (!response.ok) {
          throw new Error('Error al obtener cuentas');
        }
        const data = await response.json();
        const filteredAccounts = data.slice(1, 5);
        setAccounts(filteredAccounts);
      } catch (error) {
        console.error('Error al obtener cuentas:', error);
      }
    };

    fetchAccounts();
    initMercadoPago(apiKey); // Inicializar MercadoPago con la clave pública
  }, []);

  const handlePlanSelection = async (accountId: number , price:number) => {
    setSelectedAccountId(accountId);

    if (price === 0) { 
      
      setPreferenceId('');
      return;
    }

    try {
      const response = await fetch(`${APIURL}/payments/preference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accountId }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la preferencia de pago');
      }

      const data = await response.json();
      setPreferenceId(data.preferenceId); // Guarda el ID de preferencia para el botón de Mercado Pago
    } catch (error) {
      console.error('Error al crear la preferencia:', error);
    }
  };
  return (
    <div className='min-h-screen flex flex-col items-center justify-center py-8'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold py-4'>Awesome Pricing Plan</h1>
        <h3 className='pb-4'>
          There are many variations of passages of Lorem Ipsum available <br /> but the majority have suffered alteration in some form.
        </h3>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-center w-full mt-8 gap-8 px-4'>
      {accounts.map((account) => (
          <div 
            key={account.id} 
            className={`duration-300 ease-in-out relative hover:scale-110 h-auto rounded-3xl py-4 px-16 shadow-2xl border-2 ${selectedAccountId === account.id ? 'bg-primaryColor text-white' : ''}`}
            onClick={() => handlePlanSelection(account.id, account.price)} // Aquí se pasa también el precio
          >
            <h2 className='text-lg font-bold mt-8'>{account.name}</h2>
            <h3>$<span className='text-4xl font-bold'>{account.price}</span> Per Month</h3>
            <h4>{account.description}</h4>
            <h4>All UI components</h4>
            <h4>Lifetime access</h4>
            <h4>Free updates</h4>
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

export default PricingTable