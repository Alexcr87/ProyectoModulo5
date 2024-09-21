import { IloginError, IloginProps } from "@/interfaces/ILogin";

export const validateFields = (values: IloginProps): IloginError => {

        const errors: IloginError = {
        };

    // if (!errors.email) {
    //   errors.email = 'El correo electrónico es requerido';
    // } else 
    if ( values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'El correo electrónico no es válido';
    }

    // if (!errors.password) {
    //   errors.password = 'La contraseña es requerida';
    // } else 
    if ( values.password &&  values.password.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    return errors;
    // setErrors(errors);
  };
