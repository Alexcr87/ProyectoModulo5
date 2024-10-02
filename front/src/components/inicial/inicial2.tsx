"use client";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useEffect, useState } from 'react';
import PricingTable2 from '../pricingTable/PricingTable2';
import Account from '@/interfaces/account';


const Inicial2 = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [preferenceId, setPreferenceId] = useState('');
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiKey) {
      console.error('La clave pública de Mercado Pago no está definida en las variables de entorno.');
      return;
    }

    const fetchAccounts = async () => {
      try {
        const response = await fetch('http://localhost:3000/payments/packages');
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
      const response = await fetch('http://localhost:3000/payments/preference', {
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
    <div>
      <PricingTable2
        accounts={accounts}
        onPlanSelect={handlePlanSelection}
        selectedAccountId={selectedAccountId}
        preferenceId={preferenceId} // Pasamos el preferenceId al componente de tabla
      />
    </div>
  );
};

export default Inicial2;

  



   

 