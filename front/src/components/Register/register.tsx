"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IRegisterError, IRegisterProps } from "./TypesRegister";
import { register } from "@/helpers/auth.helper";
import { validateRegisterForm } from "@/helpers/validateRegister";

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
    // Cambia 'ruta/del/archivo.xlsx' por la ruta real de tu archivo Excel
    const link = document.createElement("a");
    link.href = `${window.location.origin}/images/ExcelDeMuestra.xlsx`; // URL del archivo Excel
    link.download = "ExcelDeMuesta.xlsx"; // Nombre del archivo que se descargará
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
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

          </div>

          <div className="flex flex-col ml-[3em] pr-[4em] w-1/2">
            <div className="flex flex-col mt-4">
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

            <img
              src="/path-to-your-image.jpg"
              alt="Small icon"
              className="w-5 h-5 mx-auto"
            />
            <button
              className="border rounded-full h-10 bg-tertiaryColor text-white m-10 disabled:opacity-50"
              type="submit"
              disabled={!isFormValid}
            >
              Register
            </button>
            <div className="flex flex-col mt-4">
        <button
          type="button"
          onClick={handleDownloadExcel}
          className="border rounded-full h-10 bg-tertiaryColor text-white"
        >
          Descargar Excel
        </button>
      </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
