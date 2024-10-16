'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IRegisterError, IRegisterProps } from "./TypesRegister";
import { register } from "@/helpers/auth.helper";
import { validateRegisterForm } from "@/helpers/validateRegister";
import Swal from 'sweetalert2';
import { useAuth } from "@/context/Authontext";
import { countries } from "@/components/utils/countries"; // Importa la lista de países
import { citiesByCountry } from "@/components/utils/citiesByCountry";
import { Country, City } from "@/components/utils/types";

import Spinner from "../ui/Spinner";
import { Tooltip } from 'react-tooltip'

const RegisterModerator = () => {
  const router = useRouter();
  const { userData, setUserData } = useAuth();
  const initialState: IRegisterProps = {
    name: "",
    dni: "",
    address: "",
    email: "",
    password: "",
    country: "",
    city: ""
  };

  const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
  const [errors, setErrors] = useState<IRegisterError>(initialState);
  const [isFormValid, setIsFormValid] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  
  const parentId = userData?.userData?.id;
  const fetchCitiesByCountryId = (countryId: number) => {
    return citiesByCountry.filter((city: { id_country: number; }) => city.id_country === countryId);
};

  useEffect(() => {
    setIsFormValid(
      dataUser.name.trim() !== "" &&
      dataUser.email.trim() !== "" &&
      dataUser.dni.trim() !== "" &&
      dataUser.address.trim() !== "" &&
      dataUser.country.trim() !== "" &&
      dataUser.city.trim() !== ""
    );
  }, [dataUser]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const fieldName = name as keyof IRegisterProps;

    // Actualizar los valores del usuario
    setDataUser((prevDataUser) => ({
      ...prevDataUser,
      [fieldName]: value,
    }));

    // Validar inmediatamente el campo editado
    const validationErrors = validateRegisterForm({ ...dataUser, [fieldName]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: validationErrors[fieldName] || "",
    }));

    // Restablecer isSubmitted cuando el usuario corrige un campo
    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryId = Number(event.target.value);
    const selectedCountryName = countries.find(country => country.id === selectedCountryId)?.name || "";

    setDataUser((prevDataUser) => ({
      ...prevDataUser,
      country: selectedCountryName,
      city: "" // Reiniciar la ciudad al cambiar el país
    }));

    const fetchedCities = fetchCitiesByCountryId(selectedCountryId);
    setCities(fetchedCities);

    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    setIsLoading(true);
  
    const validationErrors = validateRegisterForm(dataUser);
    if (Object.keys(validationErrors).length > 0) {
      // Actualiza el estado de los errores
      setErrors(validationErrors);
      
      Swal.fire({
        icon: "warning",
        title: "Por favor corrige los siguientes errores:",
        text: Object.values(validationErrors).join(", "),
      });
  
      return; 
    }
  
    try {
      const result = await register(dataUser, parentId);
      setUserData(result);
  
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Usted se registró con éxito",
        showConfirmButton: false,
        timer: 1500
      });
  
      router.push("/login");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex flex-col items-center bg-blue-50 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-black-800 mb-2 text-center">
        Comienza a ser parte de Voting System
      </h1>
      <h2 className="text-lg text-center text-gray-700 mb-4">
        Regístrate y gestiona el sistema de votación con nuestra plataforma.
      </h2>
      <form 
        className="w-full max-w-lg space-y-6 bg-white shadow-lg rounded-lg p-8 border border-gray-200"
        autoComplete="off" 
        onSubmit={handleSubmit}
      >
        {/* Nombre */}
        <div className="relative">
          <label className="flex items-center">
            Nombre
            <span
              className="ml-2 text-blue-500 cursor-pointer"
              data-tooltip-id="tooltip-name"
            >
              ℹ️
            </span>
            <Tooltip id="tooltip-name" place="top" content="Ingresa tu nombre completo aquí." />
          </label>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={dataUser.name}
            onChange={handleChange}
            className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            autoComplete="off"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
  
        {/* DNI */}
        <div className="relative">
          <label className="flex items-center">
            DNI
            <span
              className="ml-2 text-blue-500 cursor-pointer"
              data-tooltip-id="tooltip-dni"
            >
              ℹ️
            </span>
            <Tooltip id="tooltip-dni" place="top" content="Introduce tu número de DNI." />
          </label>
          <input
            type="text"
            name="dni"
            placeholder="DNI"
            value={dataUser.dni}
            onChange={handleChange}
            className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            autoComplete="off"
          />
          {errors.dni && <p className="text-red-500">{errors.dni}</p>}
        </div>
  
        {/* Dirección */}
        <div className="relative">
          <label className="flex items-center">
            Dirección
            <span
              className="ml-2 text-blue-500 cursor-pointer"
              data-tooltip-id="tooltip-address"
            >
              ℹ️
            </span>
            <Tooltip id="tooltip-address" place="top" content="Introduce tu dirección completa." />
          </label>
          <input
            type="text"
            name="address"
            placeholder="Dirección"
            value={dataUser.address}
            onChange={handleChange}
            className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            autoComplete="off"
          />
          {errors.address && <p className="text-red-500">{errors.address}</p>}
        </div>
  
        {/* Correo Electrónico */}
        <div className="relative">
          <label className="flex items-center">
            Correo Electrónico
            <span
              className="ml-2 text-blue-500 cursor-pointer"
              data-tooltip-id="tooltip-email"
            >
              ℹ️
            </span>
            <Tooltip id="tooltip-email" place="top" content="Introduce un correo electrónico válido." />
          </label>
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={dataUser.email}
            onChange={handleChange}
            className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            autoComplete="off"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
  
        {/* Contraseña */}
        <div className="relative">
          <label className="flex items-center">
            Contraseña
            <span
              className="ml-2 text-blue-500 cursor-pointer"
              data-tooltip-id="tooltip-password"
            >
              ℹ️
            </span>
            <Tooltip id="tooltip-password" place="top" content="La contraseña debe tener al menos 8 caracteres." />
          </label>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={dataUser.password}
            onChange={handleChange}
            className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            autoComplete="off"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
  
        {/* País */}
        <div className="relative">
          <label className="flex items-center">
            País
            <span
              className="ml-2 text-blue-500 cursor-pointer"
              data-tooltip-id="tooltip-country"
            >
              ℹ️
            </span>
            <Tooltip id="tooltip-country" place="top" content="Selecciona tu país de residencia." />
          </label>
          <select
            name="country"
            onChange={handleCountryChange}
            className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecciona un país</option>
            {countries.map(country => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && <p className="text-red-500">{errors.country}</p>}
        </div>
  
        {/* Ciudad */}
        <div className="relative">
          <label className="flex items-center">
            Ciudad
            <span
              className="ml-2 text-blue-500 cursor-pointer"
              data-tooltip-id="tooltip-city"
            >
              ℹ️
            </span>
            <Tooltip id="tooltip-city" place="top" content="Selecciona la ciudad en la que resides." />
          </label>
          <select
            name="city"
            value={dataUser.city}
            onChange={handleChange}
            className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecciona una ciudad</option>
            {cities.map(city => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          {errors.city && <p className="text-red-500">{errors.city}</p>}
        </div>
  
        {/* Botón de registro */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded transition duration-200"
          disabled={!isFormValid}
        >
          {isLoading ? <Spinner /> : "Registrarse"}
        </button>
      </form>
    </div>
  );
};

export default RegisterModerator;

