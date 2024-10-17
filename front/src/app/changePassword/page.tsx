"use client"
import ChangePassword from '@/components/changePassword/changePassword'
import { useAuth } from '@/context/Authontext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import NotFound from '../not-found';

const ChangePasswordPage = () => {
  const { userData } = useAuth();
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    
    if (!userData?.token) {
      router.push("/login");
    } else {
      setIsVerified(true); // Permitir que el componente se renderice
    }
  }, [userData, router]);

  if (!isVerified) {
    return (NotFound())// Mostrar nada mientras se verifica
  }
  return (
    <ChangePassword/>
  )
}

export default ChangePasswordPage
