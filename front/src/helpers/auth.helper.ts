import {  IRegisterProps } from "@/components/Register/TypesRegister";
import IGroup from "@/interfaces/IGroup";
import { IloginProps } from "@/interfaces/ILogin";
import Swal from 'sweetalert2';

const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

export async function register(userData: IRegisterProps, parentId?: string) {
  try {
    const url = new URL(`${APIURL}/auth/sigUp`);
    
    // Añadir parentId como parámetro de consulta si está disponible
    if (parentId) {
      url.searchParams.append("parentId", parentId);
    }

    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorData = await res.json(); // Obtener los detalles del error
      throw new Error(
        `Error ${res.status}: ${errorData.message || "Failed to register"}`
      );
    }
    return await res.json();
  } catch (error: any) {
    console.error("Registration error:", error.message);
    throw new Error(
      error.message || `Unknown error occurred during registration.`
    );
  }
}



export async function importUser(file: File, parentId: string | undefined, groups?:IGroup[]) {
  const formData = new FormData();
  formData.append("file", file);
  const groupsId = groups?.length ? groups.map((group) => group.id) : [];
  formData.append("groupId", JSON.stringify(groupsId));

  try {
    // Construir la URL con el parentId como parámetro de consulta
    const url = `${APIURL}/user/import?parentId=${parentId}`;

    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        // No es necesario incluir el encabezado 'Content-Type' porque fetch lo maneja automáticamente
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})); // Intenta obtener el JSON
      const errorMessage = errorData.message || `Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
     /* throw new Error(`Error ${response.status}: ${response.statusText}`);*/
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      throw new Error("La respuesta no es JSON");
    }
  } catch (error) {
    console.error("Error al subir el archivo:", error);
    throw error;
  }
}


export async function login (userData: IloginProps){
  try{
      
      const res = await fetch(`${APIURL}/auth/sigIn`,{
          method: "POST",
          headers:{
              "Content-type": "application/json"
          },
          body: JSON.stringify(userData)
      })
      if(res.ok){
          return res.json()
      }else{
          throw Error("usuario o contraseña no coincide con usuario registrado")
      }

  } catch (error: any){
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "error",
      title: "incorrect username and/or password"
    });
    return
  }
  
}