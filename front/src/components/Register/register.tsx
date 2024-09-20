"use client"

import { useRouter } from "next/navigation";
import  { useEffect, useState } from "react";
import { IRegisterError, IRegisterProps } from "./TypesRegister";
import { register } from "@/helpers/auth.helper";
import { validateRegisterForm } from "@/helpers/validateRegister";

const Register=()=> {
  const router = useRouter()
  const initialState = {
    name: "",
    dni: "",
    address: "",
    email: "",
  };
    
  const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
  const [errors, setErrors] = useState<IRegisterError>(initialState);
  const [isFormValid, setIsFormValid] = useState(false);

   useEffect(() => {
    setIsFormValid(
        dataUser.name.trim() !== '' &&
        dataUser.email.trim() !== '' &&
        dataUser.dni.trim() !== '' &&
        dataUser.address.trim() !== ''         
      );
    }, [dataUser]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDataUser({
          ...dataUser,
          [name]: value,
        });
      };
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await register(dataUser)
        alert ("Usted se registro con exito")
        router.push("/login")
      };
      useEffect(() => {
        const errors = validateRegisterForm(dataUser);
        setErrors(errors);
      }, [dataUser]);
    


return (
        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
            <div className="col-start-1 col-end-13">
                <div className="grid grid-cols-12">
                    <div className="col-start-5 col-end-9 mt-[2.5em] my-[2em] text-center text-xl" >
                        REGISTRO USUARIO
                    </div>
                </div>

                <div className="flex ">
                    <div className="flex flex-col ml-[3em] pr-[4em] w-1/2 ">
                        <div className="flex flex-col">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={dataUser.name}
                                onChange={handleChange}
                                placeholder="Nombre"
                                className="border rounded-full bg-secundaryColor text-black placeholder:text-black text-left p-2 pl-3 mt-1 outline-none focus:border-tertiaryColor shadow-xl"
                            />
                             {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                        </div>

                        <div className="flex flex-col mt-4">
                            <input
                                id="dni"
                                name="dni"
                                type="text"
                                value={dataUser.dni}
                                onChange={handleChange}
                                placeholder="DNI"
                                className="border rounded-full bg-secundaryColor text-black placeholder:text-black text-left p-2 pl-3 mt-1 outline-none focus:border-tertiaryColor shadow-xl"
                            />
                             {errors.dni && <span className="text-red-500 text-sm">{errors.dni}</span>}
                        </div>

                        <div className="flex flex-col mt-4">
                            <input
                                name="address"
                                type="text"
                                value={dataUser.address}
                                onChange={handleChange}
                                placeholder="Dirección"
                                className="border rounded-full bg-secundaryColor text-black placeholder:text-black text-left p-2 pl-3 mt-1 outline-none focus:border-tertiaryColor shadow-xl"
                            />
                             {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
                        </div>

                        <div className="flex flex-col mt-4 ">
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                value={dataUser.email}
                                onChange={handleChange}
                                placeholder="Correo Electrónico"
                                className="border rounded-full bg-secundaryColor text-black placeholder:text-black text-left p-2 pl-3 mt-1 outline-none focus:border-tertiaryColor shadow-xl"
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                        </div>

                        <button className="border rounded-full bg-secundaryColor text-black text-left p-2 pl-3 mt-4  focus:border-tertiaryColor shadow-lg relative">
                            País
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 border-t-4 border-x-4 border-transparent border-t-black">
                                {" "}
                            </span>
                        </button>

                        <button className="border rounded-full bg-secundaryColor text-black text-left p-2 pl-3 mt-4  focus:border-tertiaryColor shadow-xl relative">
                            Rol
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 border-t-4 border-x-4 border-transparent border-t-black">
                                {" "}
                            </span>
                        </button>              
                    </div>

                    <div className="flex flex-col  mr-[3em]  pl-[4em] w-1/2 ">
                        <button className="border rounded-full bg-secundaryColor text-black text-left p-2 pl-3 mt-1  focus:border-tertiaryColor shadow-xl relative">
                            Ciudad
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 border-t-4 border-x-4 border-transparent border-t-black">
                                {" "}
                            </span>
                        </button>

                        <button className="border rounded-full h-10 bg-tertiaryColor text-white m-10 disabled:opacity-50 "
                        type="submit"
                        disabled={!isFormValid}>
                            Register
                        </button>
                           
                        <img
                            src="/path-to-your-image.jpg"
                            alt="Small icon"
                            className="w-5 h-5 mx-auto"
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Register;
