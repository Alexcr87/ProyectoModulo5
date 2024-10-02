"use client";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useEffect, useState } from 'react';
import PricingTable2 from '../pricingTable/PricingTable2';
import Account from '@/interfaces/account';
import Link from 'next/link';
import PricingTable3 from '../pricingTable/PricingTable3';

const Inicial3 = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [preferenceId, setPreferenceId] = useState('');
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);
  const APIURL = process.env.NEXT_PUBLIC_API_URL

  

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const APIURL = process.env.NEXT_PUBLIC_API_URL

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
    <>
    <div>
      <PricingTable3
        accounts={accounts}
        onPlanSelect={handlePlanSelection}
        selectedAccountId={selectedAccountId}
        preferenceId={preferenceId} // Pasamos el preferenceId al componente de tabla
      />
    </div>
    <div
      className="relative w-full bg-cover bg-center h-[90vh]"
      style={{ backgroundImage: "url('https://img.freepik.com/premium-zdjecie/wyborczyni-wkladajaca-kartke-do-urny-wyborczej-wybory-i-koncepcja-glosowania_77190-18358.jpg')" }}
    >

      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          Bienvenido a la Plataforma de Votación
        </h1>
        <p className="text-lg sm:text-xl mb-2">
          Nuestra plataforma ofrece una experiencia intuitiva y accesible para que puedas gestionar elecciones de manera eficiente.
        </p>
        <p className="text-lg sm:text-xl mb-6">
          Explora los candidatos, participa en votaciones y mantente al tanto de los resultados, todo desde una única plataforma.
        </p>
        <Link href="/guia">
          <button className="bg-primaryColor text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md shadow-md hover:bg-tertiaryColor transition duration-300">
            Guía de votación
          </button>
        </Link>
      </div>
    </div>
    </>
  )
}

export default Inicial3