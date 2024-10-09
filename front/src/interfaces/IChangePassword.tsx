export interface IChangePassword{
  dni:string,
  password: string,
  newPassword: string,
  confirmPassword: string,
}

export interface IChangePasswordError {

  password?: string,
  newPassword?: string,
  confirmPassword?: string,
}