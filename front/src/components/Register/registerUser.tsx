"use client";

import {  useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IRegisterError, IRegisterProps } from "./TypesRegister";
import { validateRegisterForm } from "@/helpers/validateRegister";
import Swal from "sweetalert2";
import Input from "../ui/Input";
import Boton from "../ui/Boton";
import { useAuth } from "@/context/Authontext";
import { register } from "@/helpers/auth.helper";
import CountryCitySelector from "../CountryCitySelector/CountryCitySelector";


const RegisterByAuth0 = () => {
const router = useRouter();
const { userData } = useAuth();

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
  const [touched, setTouched] = useState<IRegisterError>(initialState);

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
   const { name } = event.target;
     setTouched({
      ...touched,
      [name]: true,
    });
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

  const handleCountryChange = (country: string) => {
    setDataUser({ ...dataUser, country });
  };

  const handleCityChange = (city: string) => {
    setDataUser({ ...dataUser, city });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
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
    }
  };

  useEffect(() => {
    const errors = validateRegisterForm(dataUser);
    setErrors(errors);
  }, [dataUser]);

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4 px-4">
    <div className="col-start-1 col-end-13">
      <div className="grid grid-cols-12">
      <div className="col-start-1 col-end-13 mt-10 mb-8 text-center text-xl">
            COMPLETAR REGISTRO
          </div>
        </div>
       
        
        <div className="flex flex-col sm:flex-row">
          <div className="flex flex-col pr-4 w-full sm:w-1/2">
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
                id="password"
                name="password"
                type="password"
                value={dataUser.password}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="**********"
              />
              {touched.password && errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
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

       
          <div className="flex flex-col pr-4 w-full sm:w-1/2">
            <div className="flex flex-col">
            <CountryCitySelector
              onCountryChange={handleCountryChange}
              onCityChange={handleCityChange}
              />
              {errors.country && <span className="text-red-500 text-sm">{errors.country}</span>}
            </div>
            <Boton
              type="submit"
            disabled={!isFormValid} 
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
