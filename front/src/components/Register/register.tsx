"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IRegisterError, IRegisterProps } from "./TypesRegister";
import { importUser, register } from "@/helpers/auth.helper";
import { validateRegisterForm } from "@/helpers/validateRegister";
import Boton from "../boton/Boton";

const Register = () => {
  const router = useRouter();
  const initialState = {
    name: "",
    dni: "",
    address: "",
    email: "",
    password: "",
    country: "",
    city: ""
  };

  const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
  const [errors, setErrors] = useState<IRegisterError>(initialState);
  const [isFormValid, setIsFormValid] = useState(false);
  const [countries, setCountries] = useState<string[]>(["Argentina", "Chile", "Colombia"]);
  const [cities, setCities] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    console.log("Archivo seleccionado:", selectedFile)
  };

  const handleUpload = async () => {
    if (!file) {
        alert("Por favor, selecciona un archivo.");
        return;
    }
    console.log(file);
    try {
        const response = await importUser(file);
        console.log(response);
        alert("Archivo subido con éxito");
        router.push("/login");
    } catch (error) {
        alert(`Error al subir el archivo`);
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setDataUser({
      ...dataUser,
      [name]: value,
    });
  };

  const handleCountryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = event.target.value;
    setDataUser({ ...dataUser, country: selectedCountry });

    // Fetch cities based on the selected country
    const fetchedCities = fetchCitiesByCountry(selectedCountry);
    setCities(fetchedCities);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await register(dataUser);
    alert("Usted se registró con éxito");
    router.push("/login");
  };

  useEffect(() => {
    const errors = validateRegisterForm(dataUser);
    setErrors(errors);
  }, [dataUser]);


  const handleDownloadExcel = () => {
    const link = document.createElement("a");
    link.href = `${window.location.origin}/images/ExcelDeMuestra.xlsx`; 
    link.download = "ExcelDeMuesta.xlsx"; 
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
                id="password"
                name="password"
                type="password"
                value={dataUser.password}
                onChange={handleChange}
                placeholder="**********"
                className="border rounded-full bg-secundaryColor text-black placeholder:text-black text-left p-2 pl-3 mt-1 outline-none focus:border-tertiaryColor shadow-xl"
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
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

            <div className="flex flex-col mt-4">
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
            <div className="flex mt-4 gap-4">
            <input
              type="file"
              onChange={handleFileChange}
            />
            <Boton text="Subir Excel" onClick={handleUpload} />
          </div>

          </div>

          <div className="flex flex-col ml-[3em] pr-[4em] w-1/2">
            <div className="flex flex-col">
              <select
                name="country"
                value={dataUser.country}
                onChange={handleCountryChange}
                className="border rounded-full bg-secundaryColor text-black p-2 pl-3 mt-1 outline-none focus:border-tertiaryColor shadow-xl"
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
                className="border rounded-full bg-secundaryColor text-black p-2 pl-3 mt-1 outline-none focus:border-tertiaryColor shadow-xl"
              >
                <option value="">Selecciona una ciudad</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
            </div>
            <button
              className="border rounded-full h-10 bg-tertiaryColor text-white my-4 disabled:opacity-50 hover:scale-105 hover:bg-primaryColor ease-in-out duration-300"
              type="submit"
              disabled={!isFormValid}
            >
              Register
            </button>
            <img
              src="/images/registerImage.png"
              alt="Small icon"
              className="w-52 mx-auto mb-4"
            />
            <div className="flex flex-col">
        <Boton text="Descargar Excel" onClick={handleDownloadExcel}/>
      </div>
          </div>
        </div>
      </div>
    </form>
    
    </>
  );
};

export default Register;

