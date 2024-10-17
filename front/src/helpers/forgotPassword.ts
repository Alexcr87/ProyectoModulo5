import { IForgotPassword } from "@/interfaces/IForgotPassword";

const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

export async function resetPassword(email: string, data: IForgotPassword) {
  try {
    const response = await fetch(`${APIURL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error al restablecer la contraseña.');
    }

    return await response.json();
  } catch (error: any) {
    console.error("Reset password error:", error.message);
    throw new Error(error.message || 'Unknown error occurred while resetting password.');
  }
}


// Función para solicitar el restablecimiento de la contraseña (envío de email)
export async function forgotPassword(email: string) {
  try {
    const res = await fetch(`${APIURL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      // Maneja el error para que puedas obtener un mensaje, incluso si no es JSON
      const errorText = await res.text(); // Cambiar a texto para manejar errores
      throw new Error(`Error ${res.status}: ${errorText}`);
    }

    const jsonData = await res.json(); // Aquí es donde podría fallar si la respuesta está vacía
    return jsonData;
  } catch (error: any) {
    console.error("Forgot password error:", error.message);
    throw new Error(error.message || 'Ocurrió un error desconocido al intentar restablecer la contraseña.');
  }
}

