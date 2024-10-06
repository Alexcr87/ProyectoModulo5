'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IRegisterError, IRegisterProps } from './TypesRegister';
import { register } from '@/helpers/auth.helper';
import { validateRegisterForm } from '@/helpers/validateRegister';
import Swal from 'sweetalert2';
import { useAuth } from '@/context/Authontext';
import { countries } from '@/utils/countries'; 
import { citiesByCountry } from '@/utils/citiesByCountry'; 
import CountryCitySelector from '../CountryCitySelector/CountryCitySelector';

const RegisterModerator = () => {
  const router = useRouter();
  const { userData, setUserData } = useAuth();
  
  const initialState: IRegisterProps = {
    name: '',
    dni: '',
    address: '',
    email: '',
    password: '',
    country: '',
    city: ''
  };

  const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
  const [errors, setErrors] = useState<IRegisterError>(initialState);
  const [isFormValid, setIsFormValid] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const parentId = userData?.userData?.id;

  useEffect(() => {
    setIsFormValid(
      dataUser.name.trim() !== '' &&
      dataUser.email.trim() !== '' &&
      dataUser.dni.trim() !== '' &&
      dataUser.address.trim() !== '' &&
      dataUser.country.trim() !== '' &&
      dataUser.city.trim() !== ''
    );
  }, [dataUser]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setDataUser((prevDataUser) => ({
      ...prevDataUser,
      [name]: value,
    }));

    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = event.target.value;
    setDataUser((prevDataUser) => ({ ...prevDataUser, country: selectedCountry }));
    
    const filteredCities = citiesByCountry
      .filter(city => city.id_country === Number(selectedCountry))
      .map(city => city.name);
    
    setCities(filteredCities);

    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    const validationErrors = validateRegisterForm(dataUser);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const result = await register(dataUser, parentId);
      setUserData(result);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usted se registró con éxito',
        showConfirmButton: false,
        timer: 1500,
      });

      router.push('/login');
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    }
  };

  return (
    <div className="flex flex-col items-center bg-blue-50 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-black-800 mb-2 text-center">Comienza a ser parte de Voting System</h1>
      <h2 className="text-lg text-center text-gray-700 mb-4">
        Regístrate y gestiona el sistema de votación con nuestra plataforma.
      </h2>
      <form className="w-full max-w-lg space-y-6 bg-white shadow-lg rounded-lg p-8 border border-gray-200" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Nombre" 
          value={dataUser.name} 
          onChange={handleChange} 
          className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" 
          required 
        />
        {isSubmitted && errors.name && <p className="text-red-500">{errors.name}</p>}
  
        <input 
          type="text" 
          name="dni" 
          placeholder="DNI" 
          value={dataUser.dni} 
          onChange={handleChange} 
          className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" 
          required 
        />
        {isSubmitted && errors.dni && <p className="text-red-500">{errors.dni}</p>}
  
        <input 
          type="text" 
          name="address" 
          placeholder="Dirección" 
          value={dataUser.address} 
          onChange={handleChange} 
          className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" 
          required 
        />
        {isSubmitted && errors.address && <p className="text-red-500">{errors.address}</p>}
  
        <input 
          type="email" 
          name="email" 
          placeholder="Correo Electrónico" 
          value={dataUser.email} 
          onChange={handleChange} 
          className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" 
          required 
        />
        {isSubmitted && errors.email && <p className="text-red-500">{errors.email}</p>}
          <div >

        <CountryCitySelector 
          onCountryChange={(country) => {
            setDataUser((prevDataUser) => ({ ...prevDataUser, country }));
            setDataUser((prevDataUser) => ({ ...prevDataUser, city: '' }));
            setCities(citiesByCountry.filter(city => city.id_country === Number(country)).map(city => city.name));
          }}
          onCityChange={(city) => {
            setDataUser((prevDataUser) => ({ ...prevDataUser, city }));
          }}
          />
          </div>
        {isSubmitted && errors.country && <p className="text-red-500">{errors.country}</p>}
        {isSubmitted && errors.city && <p className="text-red-500">{errors.city}</p>}
  
        <input 
          type="password" 
          name="password" 
          placeholder="Contraseña" 
          value={dataUser.password} 
          onChange={handleChange} 
          className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" 
          required 
        />
        {isSubmitted && errors.password && <p className="text-red-500">{errors.password}</p>}
  
        <button 
          type="submit" 
          disabled={!isFormValid} 
          className={`w-full p-3 rounded bg-blue-500 text-white font-bold hover:bg-blue-600 transition duration-300 ${!isFormValid && 'opacity-50 cursor-not-allowed'}`}>
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterModerator;
