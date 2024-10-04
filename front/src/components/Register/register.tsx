"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IRegisterError, IRegisterProps } from "./TypesRegister";
import { importUser, register } from "@/helpers/auth.helper";
import { validateRegisterForm } from "@/helpers/validateRegister";
import Boton from "../ui/Boton";
import Swal from 'sweetalert2';
import Input from "../ui/Input";
import InputFile from "../ui/InputFile";
import { useAuth } from "@/context/Authontext";

const Register = () => {
  const router = useRouter();
  const { userData, setUserData } = useAuth();
  const initialState: IRegisterProps = {
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
  const [countries] = useState<string[]>(["Argentina", "Chile", "Colombia"]);
  const [cities, setCities] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [touched, setTouched] = useState<IRegisterError>(initialState);
  const parentId = userData?.userData?.id;

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
      Argentina: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata", "Tucumán"],
      Chile: ["Santiago", "Valparaíso", "Concepción", "La Serena", "Antofagasta", "Temuco"],
      Colombia: ["Bogotá", "Medellín", "Cali", "Cartagena", "Barranquilla", "Cúcuta"],
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setDataUser((prevDataUser) => ({
      ...prevDataUser,
      [name]: value,
    }));
  };

  const handleCountryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = event.target.value;
    setDataUser((prevDataUser) => ({ ...prevDataUser, country: selectedCountry }));
    const fetchedCities = fetchCitiesByCountry(selectedCountry);
    setCities(fetchedCities);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await register(dataUser, parentId);
      setUserData(result);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Usted se registró con éxito",
        showConfirmButton: false,
        timer: 1500
      });

      router.push("/users");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message, // Mostrar mensaje de error en caso de que falle
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
    link.download = "ExcelDeMuesta.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRegisterManually = () => {
    Swal.fire({
      title: 'Registro Manual',
      html: `
        <form id="manualRegisterForm">
          <input type="text" name="name" placeholder="Nombre" class="w-11/12 my-4 p-3 text-base transition bg-transparent border rounded-md outline-none 
        border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor 
        dark:focus:border-primaryColor focus-visible:shadow-none" required>
          <input type="text" name="dni" placeholder="DNI" class="w-11/12 p-3 text-base transition bg-transparent border rounded-md outline-none 
        border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor 
        dark:focus:border-primaryColor focus-visible:shadow-none" required>
          <input type="text" name="address" placeholder="Dirección" class="w-11/12 my-4 p-3 text-base transition bg-transparent border rounded-md outline-none 
        border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor 
        dark:focus:border-primaryColor focus-visible:shadow-none" required>
          <input type="email" name="email" placeholder="Correo Electrónico" class="w-11/12 p-3 text-base transition bg-transparent border rounded-md outline-none 
        border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor 
        dark:focus:border-primaryColor focus-visible:shadow-none" required>
          <select name="country" class="w-11/12 my-4 p-3 text-base transition bg-transparent border rounded-md outline-none 
        border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor 
        dark:focus:border-primaryColor focus-visible:shadow-none" required>
            <option value="">Selecciona un país</option>
            ${countries.map(country => `<option value="${country}">${country}</option>`).join('')}
          </select>
          <select name="city" class=" w-11/12 p-3 text-base transition bg-transparent border rounded-md outline-none 
        border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor 
        dark:focus:border-primaryColor focus-visible:shadow-none" required>
            <option value="">Selecciona una ciudad</option>
            ${cities.map(city => `<option value="${city}">${city}</option>`).join('')}
          </select>
        </form>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const form = document.getElementById('manualRegisterForm') as HTMLFormElement;
        const formData = new FormData(form);
        const data: IRegisterProps = {
          name: formData.get('name') as string,
          dni: formData.get('dni') as string,
          address: formData.get('address') as string,
          email: formData.get('email') as string,
          password: "", // Asigna una contraseña o permite que el usuario la ingrese
          country: formData.get('country') as string,
          city: formData.get('city') as string,
        };
        setDataUser(data);
        handleSubmit({ preventDefault: () => {} } as any); // Llama a handleSubmit
      },
      customClass: {
        confirmButton: 'bg-primaryColor hover:bg-primaryColor-dark text-white px-4 py-2 rounded-md',
        popup: 'bg-gray-100',
        title: 'text-2xl font-bold text-primaryColor'
      },
      confirmButtonText: 'Registrar',
    });
    document.querySelector('select[name="country"]')?.addEventListener('change', (e) => {
      const selectedCountry = (e.target as HTMLSelectElement).value;
      const updatedCities = fetchCitiesByCountry(selectedCountry);
      const citySelect = document.querySelector('select[name="city"]');
      if (citySelect) {
        citySelect.innerHTML = updatedCities.map(city => `<option value="${city}">${city}</option>`).join('');
      }
    });
  };

  const handleRegisterByExcel = () => {
    Swal.fire({
      title: 'Registro por Excel',
      html: `
        <div>
          <p> 1º - Descarga la plantilla y llena los datos.</p>
          <span class="text-red-500">Nota: no editar las columnas en el excel </span>
          <button onclick="document.getElementById('excelDownload').click();" class="w-full px-5 py-3 my-4 text-base text-white transition duration-300 ease-in-out border rounded-md cursor-pointer hover:scale-105 border-primaryColor bg-primaryColor hover:bg-blue-800">Descarga la plantilla</button>
          <a id="excelDownload" href="/images/ExcelDeMuestra.xlsx" style="display: none;"></a>
          <p> 2º - Subir el excel
          <input type="file" id="fileUpload" class="w-full m-3 text-base transition bg-transparent border rounded-md outline-none 
        border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor 
        dark:focus:border-primaryColor focus-visible:shadow-none 
        file:bg-primaryColor file:h-full file:border-none file:text-white file:p-3" accept=".xlsx, .xls" />
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Subir',
      preConfirm: () => {
        const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
        const file = fileInput.files?.[0];

        if (!file) {
          Swal.showValidationMessage('Por favor selecciona un archivo');
        }

        return file;
      },
      customClass: {
        confirmButton: 'bg-primaryColor hover:bg-primaryColor-dark text-white px-4 py-2 rounded-md',
        popup: 'bg-gray-100',
        title: 'text-2xl font-bold text-primaryColor'
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleFileChange({ target: { files: [result.value] } } as any);
        handleUpload();
      }
    });
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-8">
      <img src="/images/logo.png" alt="Logo" className="mr-2 w-32" />
      <h1 className="text-5xl mb-4">Registro de Usuarios</h1>
      <h2 className="text-xl text-center mb-8">
      ¡Bienvenido a la plataforma de registro de votantes para tu campaña! Aquí podrás registrar a los usuarios que formarán parte de esta emocionante experiencia electoral. Te ofrecemos múltiples opciones para facilitar el proceso: puedes registrar a los votantes de manera manual o simplemente cargar un archivo de Excel con toda la información necesaria. ¡Hagamos que cada voz cuente!
      </h2>
      <div className="flex flex-col space-y-6 mt-8">
        <div className="w-64 mx-auto">
          <Boton onClick={handleRegisterManually}>
            Registrar Manualmente
          </Boton>
        </div>
        <div className="w-64 mx-auto">
          <Boton onClick={handleRegisterByExcel}>
            Registrar por Excel
          </Boton>
        </div>
      </div>
    </div>
  );
};


export default Register;
