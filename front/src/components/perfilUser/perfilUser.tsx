"use client"

import { useAuth } from "@/context/Authontext";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { IRegisterError, IRegisterProps } from "../Register/TypesRegister";
import Swal from "sweetalert2";
import { validateRegisterForm } from "@/helpers/validateRegister";
import Input from "../ui/Input";
import Boton from "../ui/Boton";
import { getUserByID, updateUserById } from "@/helpers/user.helper";
import { userSession } from "@/interfaces/Session";

const VoterProfile = () => {
  const router = useRouter();
  const { userData, setUserData } = useAuth();
  
  const initialState = {
    id: userData?.userData?.id || "",
  name: userData?.userData?.name || "",
  dni: userData?.userData?.dni ? String(userData?.userData?.dni) : "",
  address: userData?.userData?.address || "",
  email: userData?.userData?.email || "",
  country: userData?.userData?.country || "",
  city: userData?.userData?.city || "",
    };
    
    const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
    const [errors, setErrors] = useState<IRegisterError>(initialState);
    const [isFormValid, setIsFormValid] = useState(false);
    const [countries] = useState<string[]>(["Argentina", "Chile", "Colombia"]);
    const [cities, setCities] = useState<string[]>([]);
    const [touched, setTouched] = useState<IRegisterError>(initialState);
  
    const handleBlur = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
     const { name } = event.target;
       setTouched({
        ...touched,
        [name]: true,
      });
     };
  
    const fetchCitiesByCountry = (country: string) => {
      const countryCitiesMap: Record<string, string[]> = {
        "Argentina": ["Buenos Aires", "Córdoba", "Rosario"],
        "Chile": ["Santiago", "Valparaíso", "Concepción"],
        "Colombia": ["Bogotá", "Medellín", "Cali"],
      };
      return countryCitiesMap[country] || [];
    };
  
    useEffect(() => {
      setIsFormValid(
        dataUser.name.trim() !== '' &&
        dataUser.email.trim() !== '' &&
        String(dataUser.dni).trim() !== '' &&
        dataUser.address.trim() !== '' &&
        dataUser.country.trim() !== '' &&
        dataUser.city.trim() !== ''
      );
    }, [dataUser]);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setDataUser({
        ...dataUser,
        [name]: value,
      });
    };
  
    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedCountry = event.target.value;
      setDataUser({ ...dataUser, country: selectedCountry });
  
      // Fetch cities based on the selected country
      const fetchedCities = fetchCitiesByCountry(selectedCountry);
      setCities(fetchedCities);
    };

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  
  try {
    if (!userData?.userData.id) {
      return "error el id es undefined"
    }

    // Actualiza los datos del usuario en el backend
    await updateUserById(dataUser, userData?.userData.id);

    // Obtener los datos actualizados del usuario desde el backend
    const updatedUser = await getUserByID(userData.userData.id);
    

    // Actualizar el contexto de autenticación con los nuevos datos
    const updatedUserSession:userSession = {
      userData: updatedUser,
      token:userData.token 
    };

    // Actualiza el localStorage y el estado de useAuth()
    localStorage.setItem("userSession", JSON.stringify(updatedUserSession));
    setUserData(updatedUserSession);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Datos actualizados con éxito",
      showConfirmButton: false,
      timer: 1500,
    });

    // Actualizar el estado del formulario con los datos nuevos
    setDataUser({
      ...dataUser,
      ...updatedUser,
    });
  } catch (error: any) {
    // Manejo de errores (DNI o email duplicados, etc.)
    if (error.message.includes("dni")) {
      Swal.fire({
        icon: "error",
        title: "DNI ya registrado",
        text: error.message || 'Hubo un error al procesar tu solicitud',
      });
    } else if (error.message.includes("email")) {
      Swal.fire({
        icon: "error",
        title: "Correo ya registrado",
        text: error.message || 'Hubo un error al procesar tu solicitud',
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || 'Hubo un error al procesar tu solicitud',
      });
    }
  }
};


    useEffect(() => {
      const errors = validateRegisterForm(dataUser);
      setErrors(errors);
    }, [dataUser]);
  
    return (
      <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
        <div className="col-start-1 col-end-13">
          <div className="grid grid-cols-12">
            <div className="col-start-5 col-end-9 mt-[2.5em] my-[2em] text-center text-xl">
              ACTUALIZACION DE DATOS
            </div>
          </div>
  
          <div className="flex">
            <div className="flex flex-col ml-[3em] pr-[4em] w-1/2">
              <div className="flex flex-col">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={dataUser.name}
                  onChange={handleChange}
                  placeholder={userData?.userData.name}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </div>
  
              <div className="flex flex-col mt-4">
                <Input
                  id="dni"
                  name="dni"
                  type="text"
                  value={userData?.userData.dni}
                  onChange={handleChange}
                  placeholder="DNI"
                />
                {errors.dni && <span className="text-red-500 text-sm">{errors.dni}</span>}
              </div>
  
              <div className="flex flex-col mt-4">
                <Input
                  name="address"
                  type="text"
                  value={dataUser.address}
                  onChange={handleChange}
                  placeholder={userData?.userData.address}
                />
                {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
              </div>
              <div className="flex flex-col mt-4">
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  value={dataUser.email}
                  onChange={handleChange}
                  placeholder={userData?.userData.email}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
              </div>
            </div>
  
            <div className="flex flex-col ml-[3em] pr-[4em] w-1/2">
              <div className="flex flex-col">
                <select
                  name="country"
                  value={dataUser.country}
                  onChange={handleCountryChange}
                  className="w-full px-5 py-3 text-base transition bg-transparent border rounded-md outline-none 
                  border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 focus:border-primaryColor 
                  dark:focus:border-primaryColor focus-visible:shadow-none"
                >
                  <option value={`${userData?.userData.country}`}>{userData?.userData.country}</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                {errors.country && <span className="text-red-500 text-sm">{errors.country}</span>}
              </div>
  
              <div className="flex flex-col my-4">
                <select
                  name="city"
                  value={dataUser.city}
                  onChange={handleChange}
                  className="w-full px-5 py-3 text-base transition bg-transparent border rounded-md outline-none 
                    border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 focus:border-primaryColor 
                    dark:focus:border-primaryColor focus-visible:shadow-none"
                >
                  <option value={`${userData?.userData.city}`}>{userData?.userData.city}</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
              </div>
              <Boton
                type="submit"
                //disabled={!isFormValid}
              >
                Actualizar Datos
              </Boton>
              <img
                src="/images/registerImage.png"
                alt="Small icon"
                className="w-52 mx-auto mt-12"
              />
            </div>
          </div>
        </div>
      </form>
    );
  };
  
  export default VoterProfile;

function getUserById(id: string) {
  throw new Error("Function not implemented.");
}
