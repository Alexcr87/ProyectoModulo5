'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IRegisterError, IRegisterProps } from "./TypesRegister";
import { register } from "@/helpers/auth.helper";
import { validateRegisterForm } from "@/helpers/validateRegister";
import Swal from 'sweetalert2';
import { useAuth } from "@/context/Authontext";

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
  const [countries] = useState<string[]>(["Argentina", "Chile", "Colombia"]);
  const [cities, setCities] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const parentId = userData?.userData?.id;

  const fetchCitiesByCountry = (country: string) => {
    const countryCitiesMap: Record<string, string[]> = {
      Argentina: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata", "Tucumán"],
      Chile: ["Santiago", "Valparaíso", "Concepción", "La Serena", "Antofagasta", "Temuco"],
      Colombia: ["Bogotá", "Medellín", "Cali", "Cartagena", "Barranquilla", "Cúcuta"],
    };
    return countryCitiesMap[country] || [];
  };

  useEffect(() => {
     setIsFormValid(
      dataUser.name.trim() !== "" &&
      dataUser.email.trim() !== "" &&
      dataUser.dni.trim() !== "" &&
      dataUser.address.trim() !== "" &&
      dataUser.country.trim() !== "" &&
      dataUser.city.trim() !== ""&&
      dataUser.password.trim() !== ""
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

  const handleCountryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = event.target.value;
    setDataUser((prevDataUser) => ({ ...prevDataUser, country: selectedCountry }));
    const fetchedCities = fetchCitiesByCountry(selectedCountry);
    setCities(fetchedCities);

    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  
    event.preventDefault();
    setIsSubmitted(true);
  
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
    }
  };

  return (
    <div className="flex flex-col items-center bg-blue-50 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-black-800 mb-2 text-center">Comienza a ser parte de Voting System</h1>
      <h2 className="text-lg text-center text-gray-700 mb-4">
        Regístrate y gestiona el sistema de votación con nuestra plataforma.
      </h2>
      <form className="w-full max-w-lg space-y-6 bg-white shadow-lg rounded-lg p-8 border border-gray-200" autoComplete="off" onSubmit={handleSubmit}>
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
        {  errors.name && <p className="text-red-500">{errors.name}</p>}
        
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
        {  errors.dni && <p className="text-red-500">{errors.dni}</p>}
        
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
        { errors.address && <p className="text-red-500">{errors.address}</p>}
        
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
        {isSubmitted && errors.email && <p className="text-red-500">{errors.email}</p>}
        
        <select 
         
          name="country" 
          value={dataUser.country} 
          onChange={handleCountryChange} 
          className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          autoComplete="off"
         
        >
          <option value="">Selecciona un país</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        { errors.country && <p className="text-red-500">{errors.country}</p>}
        
        <select
          name="city" 
          value={dataUser.city} 
          onChange={handleChange} 
          className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          autoComplete="off"
        >
          <option value="">Selecciona una ciudad</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        {  errors.city && <p className="text-red-500">{errors.city}</p>}
        
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
          { errors.password && <p className="text-red-500">{errors.password}</p>}
        
        <button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded transition duration-200"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterModerator;







