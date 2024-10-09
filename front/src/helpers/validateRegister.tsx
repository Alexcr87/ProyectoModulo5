import { IRegisterError, IRegisterProps } from "../components/Register/TypesRegister";


export function validateRegisterForm(values: IRegisterProps): IRegisterError {
  const errors: IRegisterError = {};

  // Validación del email
  if (!values.email.trim()) {
    errors.email = "El correo electrónico es obligatorio.";
  } else if (!/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
    errors.email = "Correo electrónico inválido.";
  }

  // Validación del nombre
  if (!values.name.trim()) {
    errors.name = "El nombre es obligatorio.";
  } else if (!/^[a-zA-Z\s]+$/.test(values.name)) {
    errors.name = "El nombre no debe tener números ni símbolos.";
  } else if (/\s{2,}/.test(values.name)) {
    errors.name = "El nombre no debe tener más de dos espacios consecutivos.";
  }

  if (!values.address?.trim()) {
    errors.address = "La dirección es obligatoria.";
  }

  // Validación del DNI (número y sin puntos)
  if (!values.dni.trim()) {
    errors.dni = "El DNI es obligatorio.";
  } else if (!/^\d+$/.test(values.dni)) {
    errors.dni = "El DNI debe ser un número sin puntos.";
  }

  // Validación de la contraseña
  if (values.password) {
    if (values.password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres.";
    } else if (values.password.length > 20) {
      errors.password = "La contraseña debe tener menos de 20 caracteres.";
    } else if (!/[A-Z]/.test(values.password)) {
      errors.password = "La contraseña debe tener al menos una letra mayúscula.";
    } else if (!/[!@#$%^&*]/.test(values.password)) {
      errors.password = "La contraseña debe contener al menos un carácter especial.";
    } else if (/\s/.test(values.password)) {
      errors.password = "La contraseña no debe contener espacios.";
    }
  }
   // Validación del país
   if (!values.country?.trim()) {
    errors.country = "El país es obligatorio.";
  }

  // Validación de la ciudad
  if (!values.city?.trim()) {
    errors.city = "La ciudad es obligatoria.";
  }



  return errors;
}



/*export function validateRegisterForm(values: IRegisterProps): IRegisterError {
  const errors: IRegisterError = {};
  
  if (values.email && !/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
    errors.email = "Correo electronico invalido.";
  }

  if (values.name && !/^[a-zA-Z\s]+$/.test(values.name)) {
    errors.name = "El nombre no debe tener numeros y simbolos.";
  }
  if (!values.name.trim()) {
  
  }
  if (/\s{2,}/.test(values.name)) {
    errors.name = "El nombre no debe tener mas de dos espacios consecutivos.";
  }

  if (values.dni && !/^\d+$/.test(values.dni)) {
    errors.dni = "dni debe ser un número.";
  }
  if (typeof values.password === 'string') {
    if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    } else if (values.password.length > 20) {
      errors.password = "Password must be less than 20 characters.";
    } else if (!/[A-Z]/.test(values.password)) {
      errors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[!@#$%^&*]/.test(values.password)) {
      errors.password = "Password must contain at least one special character.";
    } else if (/\s/.test(values.password)) {
      errors.password = "Password must not contain spaces.";
    }
  }


  return errors;
};*/
