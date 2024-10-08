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
import CountryCitySelector from "@/components/CountryCitySelector/CountryCitySelector"; 

const RegisterByAuth0 = () => {
  const router = useRouter();
  const { userData } = useAuth();

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

  const handleCountryChange = (country: string) => {
    setDataUser({ ...dataUser, country });
  };

  const handleCityChange = (city: string) => {
    setDataUser({ ...dataUser, city });
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
    router.push("/login");
  };

  useEffect(() => {
    const errors = validateRegisterForm(dataUser);
    setErrors(errors);
  }, [dataUser]);

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
      <div className="col-start-1 col-end-13">
        <div className="grid grid-cols-12">
          <div className="col-start-1 col-end-13 mt-[2.5em] my-[2em] text-center text-xl">
            COMPLETAR REGISTRO
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col md:w-1/2 mx-4 mb-4">
            <Input
              id="name"
              name="name"
              type="text"
              value={userData?.userData.name}
              onChange={handleChange}
              placeholder="Nombre"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            
            <Input
              id="dni"
              name="dni"
              type="text"
              value={dataUser.dni}
              onChange={handleChange}
              placeholder="DNI"
              className="mt-4 w-full px-5 py-3 text-base transition bg-transparent border rounded-md outline-none 
        border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor 
        dark:focus:border-primaryColor focus-visible:shadow-none" 
            />
            {errors.dni && <span className="text-red-500 text-sm">{errors.dni}</span>}

            <Input
              name="address"
              type="text"
              value={dataUser.address}
              onChange={handleChange}
              placeholder="Dirección"
              className="mt-4 w-full px-5 py-3 text-base transition bg-transparent border rounded-md outline-none 
              border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor 
              dark:focus:border-primaryColor focus-visible:shadow-none" 
                  />
            {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}

            <Input
              id="email-address"
              name="email"
              type="email"
              value={userData?.userData.email}
              onChange={handleChange}
              placeholder="Correo Electrónico"
              className="mt-4 w-full px-5 py-3 text-base transition bg-transparent border rounded-md outline-none 
              border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor 
              dark:focus:border-primaryColor focus-visible:shadow-none" 
                  />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>

          <div className="flex flex-col md:w-1/2 mx-4 mb-4">
            <CountryCitySelector
              onCountryChange={handleCountryChange}
              onCityChange={handleCityChange}
            />
            {errors.country && <span className="text-red-500 text-sm">{errors.country}</span>}
            
            <Boton type="submit" disabled={!isFormValid} className="mt-4">
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
