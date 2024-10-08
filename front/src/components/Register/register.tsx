"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IRegisterError, IRegisterProps } from "./TypesRegister";
import { validateRegisterForm } from "@/helpers/validateRegister";
import Swal from "sweetalert2";
import { IloginProps } from "@/interfaces/ILogin";
import Input from "../ui/Input";
import Boton from "../ui/Boton";
import { useAuth } from "@/context/Authontext";
import { importUser, register } from "@/helpers/auth.helper";
import CountryCitySelector from "@/components/CountryCitySelector/CountryCitySelector"; // Asegúrate de importar el componente
import IGroup from "@/interfaces/IGroup";
import Select from 'react-select';

const Register = () => {
  const router = useRouter();
  const { userData } = useAuth();
  const initialState = {
    name: "",
    dni: "",
    address: "",
    email: `${userData?.userData.email}`,
    password: "",
    country: "",
    city: "",
    groupId:"",
    groups: [],
  };
  const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
  const [errors, setErrors] = useState<IRegisterError>(initialState);
  const [isFormValid, setIsFormValid] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [touched, setTouched] = useState<IRegisterError>(initialState);
  const [userSesion, setUserSesion] = useState<IloginProps>();
  const pathname = usePathname();
  const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;


  const handleBlur = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = event.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };
  
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const parentId = userData?.userData.id

  useEffect(() => {
    const fetchGroups = async () => {
      if (parentId) {
        try {
          const response = await fetch(`${APIURL}/groups/user/${parentId}`)
          const data = await response.json();
          setGroups(data);
        } catch (error) {
          console.error('Error fetching groups:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al obtener los grupos',
            text: 'Hubo un problema al cargar los grupos. Intente nuevamente.',
          });
        }
      }
    };
  
    fetchGroups();
  }, [parentId]);
  

  const handleUpload = async () => {
    if (!file) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, selecciona un archivo.",
      });
      return;
    }
  
    try {
      await importUser(file, parentId);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Archivo subido con éxito",
        showConfirmButton: false,
        timer: 1500
      });
      router.push("/users");
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al subir el archivo",
        showConfirmButton: false,
        timer: 1500
      });
    }
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
      dataUser.dni.trim() !== '' &&
      dataUser.address.trim() !== '' &&
      dataUser.country.trim() !== '' &&
      dataUser.city.trim() !== ''
    );
  }, [dataUser]);


  const handleMultiSelectChange = (selectedOptions: any) => {
    const selectedGroups = selectedOptions.map((option: any) => ({ id: option.value, name: option.label }));
    setDataUser(prevData => ({
      ...prevData,
      groups: selectedGroups,
    }));
  };

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
    
    const userDataWithParentId = {
      ...dataUser,
    };
  
    try {
      await register(dataUser);
      const result = await register(userDataWithParentId, parentId); // Pasa parentId aquí
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Usted se registró con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/users");
    } catch (error: any) {
      if (error.message.includes("dni")) { // Verifica si el error está relacionado con el DNI
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
  return (<>
    <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
      <div className="col-start-1 col-end-13">
        <div className="grid grid-cols-12">
          <div className="col-start-5 col-end-9 mt-[2.5em] my-[2em] text-center text-xl">
            REGISTRO USUARIO
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
                onBlur={handleBlur}
                placeholder="Nombre"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name|| 'Este campo es obligatorio'}</span>}
            </div>

            <div className="flex flex-col mt-4">
              <Input
                id="dni"
                name="dni"
                type="text"
                value={dataUser.dni}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="DNI"
              />
              {errors.dni && <span className="text-red-500 text-sm">{errors.dni|| 'Este campo es obligatorio'}</span>}
            </div>
            <div className="flex flex-col mt-4">
              <Input
                name="address"
                type="text"
                value={dataUser.address}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Dirección"
              />
              {errors.address && <span className="text-red-500 text-sm">{errors.address|| 'Este campo es obligatorio'}</span>}
            </div>
            <div className="flex flex-col mt-4">
              <Input
                id="email-address"
                name="email"
                type="email"
                value={dataUser.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Correo Electrónico"
              />
                <div className="flex flex-col pr-4 w-full sm:w-1/2">
              {errors.email && <span className="text-red-500 text-sm">{errors.email|| 'Este campo es obligatorio'}</span>}
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
            <Select
              isMulti
              name="groups"
              options={groups.map(group => ({ value: group.id, label: group.name }))}
              className="basic-multi-select w-full"
              classNamePrefix="select"
              onChange={handleMultiSelectChange}
              value={dataUser.groups?.map(group => ({ value: group.id, label: group.name }))}
              placeholder='Selecciona grupos'
            />
            </div> 
            <Boton
              type="submit"
              disabled={!isFormValid}
            >
              Registrar
            </Boton>
            <img
              src="/images/registerImage.png"
              alt="Small icon"
              className="w-52 mx-auto my-4"
            />
          </div>
        </div>
      </div>
    </form>
    </>
  );
};

export default Register;

