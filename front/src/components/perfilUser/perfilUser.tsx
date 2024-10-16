"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


import { validateRegisterForm } from "@/helpers/validateRegister";
import Swal from "sweetalert2";
import Input from "../ui/Input";
import Boton from "../ui/Boton";
import { useAuth } from "@/context/Authontext";
import { register } from "@/helpers/auth.helper";
import Spinner from "../ui/Spinner";
import { Country, City } from "@/components/utils/types";
import { citiesByCountry } from "@/components/utils/citiesByCountry";
import { countries } from "../utils/countries";
import { Tooltip } from 'react-tooltip';
import { useUser } from "@auth0/nextjs-auth0/client";
import { getUserByID, updateUserById } from "@/helpers/user.helper";
import { userSession } from "@/interfaces/Session";
import { IRegisterError, IRegisterProps } from "../Register/TypesRegister";
import UpdateCandidate from "../updateCandidate/updateCandidate";


const VoterProfile = () => {
const router = useRouter();
const { userData, setUserData } = useAuth();
const [loading, setLoading] = useState(false);
const [isSubmitted, setIsSubmitted] = useState(false);
const {user} =useUser()


/*const localUser = localStorage.getItem("userSesion");
if (localUser) {
  userAuth = JSON.parse(localUser);
}*/

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
  const [cities, setCities] = useState<City[]>([]);
  const [touched, setTouched] = useState<IRegisterError>(initialState);
  


  // const handleBlur = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   const { name } = event.target;
  //   setTouched({
  //     ...touched,
  //     [name]: true,
  //   });
  // };
  
  useEffect(() => {
    setIsFormValid(
      dataUser.name.trim() !== '' &&
      dataUser.email.trim() !== '' &&
      dataUser.address.trim() !== '' &&
      dataUser.country.trim() !== '' &&
      dataUser.city.trim() !== ''
    );
  }, [dataUser]);

  const fetchCitiesByCountryId = (countryId: number) => {
    return citiesByCountry.filter((city: { id_country: number; }) => city.id_country === countryId);
};

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setDataUser({
      ...dataUser,
      [name]: value,
    });
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
  setLoading(true);
  
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
  }finally {
    setLoading(false); 
  }
};

  useEffect(() => {
    const errors = validateRegisterForm(dataUser, ["dni", "email"]);
    setErrors(errors);
  }, [dataUser]);

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = event.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner /> {/* Mostrar Spinner mientras carga */}
      </div>
    );
  }
  const userRoles = userData?.userData.roles.map(item => item.id)
  const isCandidate = userRoles?.includes(2)

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center">
          <Spinner /> {/* Muestra el spinner */}
        </div>
      )}
      <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
        <div className="col-start-1 col-end-13">
          <div className="grid grid-cols-12">
            <div className="col-start-5 col-end-9 mt-[2.5em] my-[2em] text-center text-xl">
              MI PERFIL
            </div>
          </div>
  
          <div className="flex">
            <div className="flex flex-col ml-[3em] pr-[4em] w-1/2">
              <div className="flex flex-col relative">
                <label className="flex items-center">
                  Nombre
                  <span
                    className="ml-2 text-blue-500 cursor-pointer"
                    data-tooltip-id="nameTooltip"
                    data-tooltip-content="Ingresa tu nombre completo aquí."
                  >
                    ℹ️
                  </span>
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={dataUser.name}
                  onChange={handleChange}
                  placeholder={user?.name!}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </div>
  
              <div className="flex flex-col mt-4 relative">
                <label className="flex items-center">
                  DNI
                  <span
                    className="ml-2 text-blue-500 cursor-pointer"
                    data-tooltip-id="dniTooltip"
                    data-tooltip-content="Introduce tu número de DNI."
                  >
                    ℹ️
                  </span>
                </label>
                <Input
                  id="dni"
                  name="dni"
                  type="text"
                  value={dataUser.dni}
                  onChange={handleChange}
                  placeholder="DNI"
                  disabled
                />
              </div>
  
              <div className="flex flex-col mt-4 relative">
                <label className="flex items-center">
                  Dirección
                  <span
                    className="ml-2 text-blue-500 cursor-pointer"
                    data-tooltip-id="addressTooltip"
                    data-tooltip-content="Introduce tu dirección completa."
                  >
                    ℹ️
                  </span>
                </label>
                <Input
                  name="address"
                  type="text"
                  value={dataUser.address}
                  onChange={handleChange}
                  placeholder="Dirección"
                />
                {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
              </div>
  
              <div className="flex flex-col mt-4 relative">
                <label className="flex items-center">
                  Correo Electrónico
                  <span
                    className="ml-2 text-blue-500 cursor-pointer"
                    data-tooltip-id="emailTooltip"
                    data-tooltip-content="El correo está prellenado y no se puede cambiar."
                  >
                    ℹ️
                  </span>
                </label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  value={dataUser.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder={dataUser.email!}
                  disabled
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
              </div>
            </div>
  
            <div className="flex flex-col ml-[3em] pr-[4em] w-1/2">
              <div className="flex flex-col relative">
                <label className="flex items-center">
                  País
                  <span
                    className="ml-2 text-blue-500 cursor-pointer"
                    data-tooltip-id="countryTooltip"
                    data-tooltip-content="Selecciona tu país de residencia."
                  >
                    ℹ️
                  </span>
                </label>
                <select
                  name="country"
                  onChange={handleCountryChange}
                  className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">{dataUser.country}</option>
                  {countries.map(country => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.country && <p className="text-red-500">{errors.country}</p>}
              </div>
  
              <div className="flex flex-col mt-4 relative">
                <label className="flex items-center">
                  Ciudad
                  <span
                    className="ml-2 text-blue-500 cursor-pointer"
                    data-tooltip-id="cityTooltip"
                    data-tooltip-content="Selecciona tu ciudad."
                  >
                    ℹ️
                  </span>
                </label>
                <select
                  name="city"
                  value={dataUser.city}
                  onChange={handleChange}
                  className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">{dataUser.city}</option>
                  {cities.map(city => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
              </div>
  
              <div className="mt-4">
                <Boton type="submit" disabled={!isFormValid || loading}>
                  {loading ? <Spinner /> : 'Actualizar Datos'}
                </Boton>
              </div>
  
              <img
                src="/images/registerImage.png"
                alt="Small icon"
                className="w-52 mx-auto mt-12"
              />
            </div>
          </div>
        </div>
      </form>
     {isCandidate && <UpdateCandidate/>}
      {/* Tooltip components */}
      <Tooltip id="nameTooltip" />
      <Tooltip id="dniTooltip" />
      <Tooltip id="addressTooltip" />
      <Tooltip id="emailTooltip" />
      <Tooltip id="countryTooltip" />
      <Tooltip id="cityTooltip" />
    </>
  );
};

export default VoterProfile;
