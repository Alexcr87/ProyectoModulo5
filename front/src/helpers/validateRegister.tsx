import { IRegisterError, IRegisterProps } from "../components/Register/TypesRegister";

export function validateRegisterForm(values: IRegisterProps): IRegisterError {
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
  
  return errors;
};
