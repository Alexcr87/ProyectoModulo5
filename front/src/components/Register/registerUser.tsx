"use client";

import { useRouter } from "next/navigation";
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
import { Tooltip } from 'react-tooltip'

const RegisterByAuth0 = () => {
const router = useRouter();
const { userData } = useAuth();
const [isSubmitted, setIsSubmitted] = useState(false);
const initialState = {
    name: ``,
    dni: "",
    address: "",
    email: ``,
    password: "",
    country: "",
    city: ""
  };

  const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
  const [errors, setErrors] = useState<IRegisterError>(initialState);
  const [isFormValid, setIsFormValid] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [touched, setTouched] = useState<IRegisterError>(initialState);
  const [isLoading, setIsLoading] = useState(false)

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
   const { name } = event.target;
     setTouched({
      ...touched,
      [name]: true,
    });
   };

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

    const newErrors = validateRegisterForm({
      ...dataUser,
      [name]: value, // Cambiar solo el campo que se está actualizando
    });
  
    setErrors(newErrors);
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
    setIsLoading(true);
    try {
      await register(dataUser); // Intenta registrar al usuario
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Usted se registró con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/login"); // Redirige al login tras el registro exitoso
    } catch (error: any) {
      if (error.message.includes("dni")) { // Verifica si el error está relacionado con el DNI
        Swal.fire({
          icon: "error",
          title: "DNI ya registrado",
          text: error.message || 'Hubo un error al procesar tu solicitud',
        });
      } else if (error.message.includes("email")) { // Verifica si el error está relacionado con el email
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
    } finally {
      setIsLoading(false);
    }
  };

  /*useEffect(() => {
    const errors = validateRegisterForm(dataUser);
    setErrors(errors);
  }, [dataUser]);*/

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="w-full justify-center flex mb-6">
          COMPLETAR REGISTRO
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            {/* Nombre */}
            <div className="flex flex-col">
              <Input
                id="name"
                name="name"
                type="text"
                value={userData?.userData.name}
                onChange={handleChange}
                placeholder="Nombre"
                data-tooltip-id="name-tooltip"
                data-tooltip-content="Ingresa tu nombre completo"
              />
              <Tooltip id="name-tooltip" />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>

            {/* DNI */}
            <div className="flex flex-col mt-4">
              <Input
                id="dni"
                name="dni"
                type="text"
                value={dataUser.dni}
                onChange={handleChange}
                placeholder="DNI"
                data-tooltip-id="dni-tooltip"
                data-tooltip-content="Ingresa tu número de DNI"
              />
              <Tooltip id="dni-tooltip" />
              {errors.dni && <span className="text-red-500 text-sm">{errors.dni}</span>}
            </div>

            {/* Dirección */}
            <div className="flex flex-col mt-4">
              <Input
                name="address"
                type="text"
                value={dataUser.address}
                onChange={handleChange}
                placeholder="Dirección"
                data-tooltip-id="address-tooltip"
                data-tooltip-content="Ingresa tu dirección completa"
              />
              <Tooltip id="address-tooltip" />
              {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
            </div>

            {/* Contraseña */}
            <div className="flex flex-col mt-4">
              <Input
                id="password"
                name="password"
                type="password"
                value={dataUser.password}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="**********"
                data-tooltip-id="password-tooltip"
                data-tooltip-content="Debe contener al menos 8 caracteres, una minúscula, una mayúscula y un caracter especial"
              />
              <Tooltip id="password-tooltip" />
              {touched.password && errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </div>

            {/* Correo Electrónico */}
            <div className="flex flex-col mt-4">
              <Input
                id="email-address"
                name="email"
                type="email"
                value={userData?.userData.email}
                onChange={handleChange}
                placeholder="Correo Electrónico"
                data-tooltip-id="email-tooltip"
                data-tooltip-content="Ingresa un correo electrónico válido"
              />
              <Tooltip id="email-tooltip" />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>
          </div>

          <div>
            {/* País */}
            <div className="flex flex-col ">
              <select
                name="country"
                onChange={handleCountryChange}
                className="-full px-5 py-3 text-base transition bg-transparent border rounded-md outline-none 
        border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor 
        dark:focus:border-primaryColor focus-visible:shadow-none"
                required
                data-tooltip-id="country-tooltip"
                data-tooltip-content="Selecciona tu país de residencia"
              >
                <option value="">Selecciona un país</option>
                {countries.map(country => (
                  <option key={country.id} value={country.id}>{country.name}</option>
                ))}
              </select>
              <Tooltip id="country-tooltip" />
              {errors.country && <p className="text-red-500">{errors.country}</p>}
            </div>

            {/* Ciudad */}
            <div className="flex flex-col mt-4">
              <select
                name="city"
                value={dataUser.city}
                onChange={handleChange}
                className="-full px-5 py-3 text-base transition bg-transparent border rounded-md outline-none 
        border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor 
        dark:focus:border-primaryColor focus-visible:shadow-none"
                required
                data-tooltip-id="city-tooltip"
                data-tooltip-content="Selecciona tu ciudad"
              >
                <option value="">Selecciona una ciudad</option>
                {cities.map(city => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
              <Tooltip id="city-tooltip" />
              {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
            </div>

            {/* Botón de Enviar */}
            <div className="mt-4">
              <Boton
                type="submit"
                disabled={!isFormValid}
              >
                {isLoading ? <Spinner /> : "Completar Registro"}
              </Boton>
            </div>

            {/* Imagen */}
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

export default RegisterByAuth0;
function setIsSubmitted(arg0: boolean) {
  throw new Error("Function not implemented.");
}

