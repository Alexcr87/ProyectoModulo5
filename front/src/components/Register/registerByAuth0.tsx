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


const RegisterByAuth0 = () => {
const router = useRouter();
const { userData } = useAuth();


/*const localUser = localStorage.getItem("userSesion");
if (localUser) {
  userAuth = JSON.parse(localUser);
}*/

const initialState = {
    name: `${userData?.userData.name}`,
    dni: "",
    address: "",
    email: `${userData?.userData.email}`,
    password: "jahsdsajh123S@",
    country: "",
    city: ""
  };

  const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
  const [errors, setErrors] = useState<IRegisterError>(initialState);
  const [isFormValid, setIsFormValid] = useState(false);
  const [countries] = useState<string[]>(["Argentina", "Chile", "Colombia"]);
  const [cities, setCities] = useState<string[]>([]);
  const [touched, setTouched] = useState<IRegisterError>(initialState);

  // const handleBlur = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   const { name } = event.target;
  //   setTouched({
  //     ...touched,
  //     [name]: true,
  //   });
  // };
  
  // useEffect(() => {
  //   // Cargar datos del local storage
  //   const localUser = localStorage.getItem("userSesion");
  //   if (localUser) {
  //     const user = JSON.parse(localUser);
  //     // Verifica que las propiedades existan antes de asignar
  //     setDataUser({
  //       name: user.name || "",
  //       dni: user.dni || "",
  //       address:user.address || "",
  //       email: user.email,
  //       password:user.password || "asjkd12321S@", // Si decides no usar la contraseña, omítela
  //       country:"",
  //       city:""
  //     });
  //   }
  // }, []);

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
    const auth0LoginUrl = `${process.env.NEXT_PUBLIC_API_URL}/login`;
    window.location.href = auth0LoginUrl;
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
 
    await register(dataUser);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Usted se registró un usuario con éxito",
      showConfirmButton: false,
      timer: 1500
    });
    handleAuth0Login()
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
            COMPLETAR REGISTRO
          </div>
        </div>

        <div className="flex">
          <div className="flex flex-col ml-[3em] pr-[4em] w-1/2">
            <div className="flex flex-col">
              <Input
                id="name"
                name="name"
                type="text"
                value={userData?.userData.name}
                onChange={handleChange}
                placeholder="Nombre"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>

            <div className="flex flex-col mt-4">
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

            <div className="flex flex-col mt-4">
              <Input
                name="address"
                type="text"
                value={dataUser.address}
                onChange={handleChange}
                placeholder="Dirección"
              />
              {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
            </div>

            <div className="flex flex-col mt-4">
              <Input
                id="email-address"
                name="email"
                type="email"
                value={userData?.userData.email}
                onChange={handleChange}
                placeholder="Correo Electrónico"
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
                <option value="">Selecciona un país</option>
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
                <option value="">Selecciona una ciudad</option>
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
              Completar Registro
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

export default RegisterByAuth0;
