"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IRegisterError, IRegisterProps } from "./TypesRegister";
import { importUser, register } from "@/helpers/auth.helper";
import { validateRegisterForm } from "@/helpers/validateRegister";
import Swal from "sweetalert2";
import Input from "../ui/Input";
import InputFile from "../ui/InputFile";
import Boton from "../ui/Boton";
import { useAuth } from "@/context/Authontext";


const Register = () => {
  const router = useRouter();
  const { userData, setUserData } = useAuth(); // Usamos userData y setUserData del AuthContext

  const initialState: IRegisterProps = {
    name: "",
    dni: "",
    address: "",
    email: "",
    password: "",
    country: "",
    city: "",
  };

  const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
  const [errors, setErrors] = useState<IRegisterError>(initialState);
  const [isFormValid, setIsFormValid] = useState(false);
  const [countries] = useState<string[]>(["Argentina", "Chile", "Colombia"]);
  const [cities, setCities] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [touched, setTouched] = useState<IRegisterError>(initialState);

  const parentId = userData?.userData?.id; // Obtenemos el id del usuario autenticado desde el contexto

  const handleBlur = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = event.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

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
        timer: 1500,
      });
      router.push("/users");
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al subir el archivo",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const fetchCitiesByCountry = (country: string) => {
    const countryCitiesMap: Record<string, string[]> = {
      Argentina: ["Buenos Aires", "Córdoba", "Rosario"],
      Chile: ["Santiago", "Valparaíso", "Concepción"],
      Colombia: ["Bogotá", "Medellín", "Cali"],
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
        dataUser.city.trim() !== ""
    );
  }, [dataUser]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setDataUser((prevDataUser) => ({
      ...prevDataUser,
      [name]: value,
    }));
  };

  const handleCountryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCountry = event.target.value;
    setDataUser((prevDataUser) => ({ ...prevDataUser, country: selectedCountry }));

    const fetchedCities = fetchCitiesByCountry(selectedCountry);
    setCities(fetchedCities);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await register(dataUser, parentId);

      // Guardamos los datos del usuario en el contexto de autenticación
      setUserData(result);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Usted se registró con éxito",
        showConfirmButton: false,
        timer: 1500,
      });

      router.push("/users");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Error al registrarse",
      });
    }
  };

  useEffect(() => {
    const validationErrors = validateRegisterForm(dataUser);
    setErrors(validationErrors);
  }, [dataUser]);

  const handleDownloadExcel = () => {
    const link = document.createElement("a");
    link.href = `${window.location.origin}/images/ExcelDeMuestra.xlsx`;
    link.download = "ExcelDeMuestra.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
                value={dataUser.email}
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
                border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor 
                dark:focus:border-primaryColor focus-visible:shadow-none" 
              >
              <option value="">Selecciona un país</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              {errors.country && <span className="text-red-500 text-sm">{errors.country}</span>}
            </div>
            <div className="flex flex-col mt-4">
              <select
                name="city"
                value={dataUser.city}
                onChange={handleChange}
                className="w-full px-5 py-3 mb-4 text-base transition bg-transparent border rounded-md outline-none 
                border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor 
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
    <div className="flex items-center justify-between mx-14">
      <div className="flex mt-4 gap-4">
        <div>
            <InputFile
              type="file"
              onChange={handleFileChange}
            />
        </div>
        <div>
            <Boton onClick={handleUpload}>Subir Excel</Boton>
        </div>
      </div>
      <div className="self-end">
        <Boton onClick={handleDownloadExcel}>Descargar Excel</Boton>
      </div>
    </div>
    
    </>
  );
};

export default Register;
