import { useUser } from '@auth0/nextjs-auth0/client';

export const ProfileClient = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return null; // o puedes manejar el loading de otra manera
  if (error) throw new Error(error.message);

  return user;
};