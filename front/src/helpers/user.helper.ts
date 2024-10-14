import { IRegisterProps } from "@/components/pricingTable/Register/TypesRegister";
import IUser from "@/interfaces/IUser";
import Swal from "sweetalert2";
import IUsers from "@/interfaces/IUsers";
import { updateUserSession, userSession } from "@/interfaces/Session";

const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

export async function getCandidates(): Promise<IUser[]> {
    try {
        const res = await fetch(`${APIURL}/candidates`,{
            cache: 'no-cache' 
        })
        const users = await res.json()
        return users
    } catch (error:any) {
        throw new Error(error)
    }
}

export async function getUserByID(id:string):Promise<updateUserSession> {
   
    try {
        const res = await fetch(`${APIURL}/user/${id}`,{
            next: {revalidate: 1200}
        })
        const user = await res.json()
        return user
    } catch (error:any) {
        throw new Error(error)
    }
}

export const deleteUsersHelper = async (userIds: string[], APIURL: string): Promise<boolean> => {
  // Verificar que APIURL esté definido
  if (!APIURL) {
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La URL de la API no está definida.',
      });
      return false;
  }

  // Validar que se hayan seleccionado usuarios
  if (userIds.length === 0) {
      Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: 'No has seleccionado ningún usuario para eliminar',
      });
      return false;
  }

  // Confirmación antes de eliminar
  const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará los usuarios seleccionados. No podrás revertirla.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
  });

  if (result.isConfirmed) {
      try {
          const response = await fetch(`${APIURL}/user`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userIds }), 
          });

          if (response.ok) {
              Swal.fire({
                  icon: 'success',
                  title: 'Eliminado',
                  text: 'Los usuarios seleccionados han sido eliminados con éxito',
              });
              return true; 
          } else {
              const errorMessage = await response.text();
              Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: `Hubo un problema al eliminar los usuarios: ${errorMessage}`,
              });
              return false;
          }
      } catch (error) {
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al eliminar los usuarios. Inténtalo nuevamente.',
          });
          return false;
      }
  }

  return false; 
};




export async function updateUserById(userData:IRegisterProps, id:string) {
    try {
        const res = await fetch(`${APIURL}/user/${id}`,{
            method:"PUT",
            headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(userData),
        })
        if (!res.ok) {
            return "respuesta error"
        }
        const user = await res.json()
        
        return user
        
    } catch (error:any) {
        throw new Error(error)
    }
    
}

