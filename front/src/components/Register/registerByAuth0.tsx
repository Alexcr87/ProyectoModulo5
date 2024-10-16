"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IRegisterError, IRegisterProps } from "./TypesRegister";

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

const RegisterByAuth0 = () => {
const router = useRouter();
const { userData, auth0UserData } = useAuth();
const [loading, setLoading] = useState(false);
const [isSubmitted, setIsSubmitted] = useState(false);
const {user} =useUser()

/*const localUser = localStorage.getItem("userSesion");
if (localUser) {
  userAuth = JSON.parse(localUser);
}*/

const initialState = {
    name: `${user?.name}`,
    dni: "",
    address: "",
    email: `${user?.email}`,
    password: "12345aS@",
    country: "",
    city: ""
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
     // Cargar datos del local storage
     const localUser = localStorage.getItem("userSesion");
     if (localUser) {
       const user = JSON.parse(localUser);
       // Verifica que las propiedades existan antes de asignar
       setDataUser({
         name: user.name || "",
         dni: user.dni || "",
         address:user.address || "",
         email: user.email,
         password:user.password || "asjkd12321S@", // Si decides no usar la contraseña, omítela
        country:"",
         city:""
       });
     }
   }, []);
  const fetchCitiesByCountryId = (countryId: number) => {
    return citiesByCountry.filter((city: { id_country: number; }) => city.id_country === countryId);
};

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
    setDataUser({
      ...dataUser,
      [name]: value,
    });
  };
  const handleAuth0Login = () => {
    const auth0LoginUrl = `${process.env.NEXT_PUBLIC_AUTH0_BASE_URL}/login`;
    window.location.href = auth0LoginUrl;
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
      await register(dataUser);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Usted se registró un usuario con éxito",
        showConfirmButton: false,
        timer: 1500
      });
      handleAuth0Login();
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al registrar",
        showConfirmButton: false,
        timer: 1500
      });
    } finally {
      setLoading(false); // Ocultar el spinner al finalizar
    }
  };
  useEffect(() => {
    const errors = validateRegisterForm(dataUser);
    setErrors(errors);
  }, [dataUser]);

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = event.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

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
              COMPLETAR REGISTRO
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
                />
                {errors.dni && <span className="text-red-500 text-sm">{errors.dni}</span>}
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
                  value={user?.email!}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder={user?.email!}
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
                  <option value="">Selecciona un país</option>
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
                  <option value="">Selecciona una ciudad</option>
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
                  {loading ? <Spinner /> : 'Completar Registro'}
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

export default RegisterByAuth0;
