import { IRegisterError, IRegisterProps } from "../components/Register/TypesRegister";

export function validateRegisterForm(values: IRegisterProps, excludedFields: string[] = []): IRegisterError {
  const errors: IRegisterError = {};

  // Validación del email
  if (!excludedFields.includes("email")) {
    if (values.email && !values.email.trim()) {
      errors.email = "El correo electrónico es obligatorio.";
    } else if (values.email && !/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
      errors.email = "Correo electrónico inválido.";
    }
  }

  // Validación del nombre
  if (!excludedFields.includes("name")) {
    if (values.name && !values.name.trim()) {
      errors.name = "El nombre es obligatorio.";
    } else if (values.name && !/^[a-zA-Z\s]+$/.test(values.name)) {
      errors.name = "El nombre no debe tener números ni símbolos.";
    } else if (values.name && /\s{2,}/.test(values.name)) {
      errors.name = "El nombre no debe tener más de dos espacios consecutivos.";
    }
  }

  // Validación de la dirección
  if (!excludedFields.includes("address")) {
    if (values.address && !values.address.trim()) {
      errors.address = "La dirección es obligatoria.";
    }
  }

  // Validación del DNI
  if (!excludedFields.includes("dni")) {
    if (values.dni && !values.dni.trim()) {
      errors.dni = "El DNI es obligatorio.";
    } else if (values.dni && !/^\d+$/.test(values.dni)) {
      errors.dni = "El DNI debe ser un número sin puntos.";
    }
  }

  // Validación de la contraseña
  if (!excludedFields.includes("password")) {
    if (!values.password) {
      errors.password = "La contraseña es obligatoria";
    } else {
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
  }

  // Validación del país
  if (!excludedFields.includes("country")) {
    if (values.country && !values.country.trim()) {
      errors.country = "El país es obligatorio.";
    }
  }

  // Validación de la ciudad
  if (!excludedFields.includes("city")) {
    if (values.city && !values.city.trim()) {
      errors.city = "La ciudad es obligatoria.";
    }
  }

  return errors;
}
