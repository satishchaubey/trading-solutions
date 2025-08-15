'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '@/components/comman/LoadingSpinner'; // Adjust path as needed
import { initializeAuth } from '@/store/authSlice';

export function withAuth(Component: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useSelector((state: any) => state.auth);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
      const authUser = localStorage.getItem('authUser');
      console.log(authUser, "authUser");
      if (!isAuthenticated && authUser) {
        dispatch(initializeAuth());
      }
      setIsCheckingAuth(false);
    }, [isAuthenticated]);

    useEffect(() => {
      if (!isCheckingAuth && !isAuthenticated && !localStorage.getItem('authUser')) {
        router.push('/');
      }
    }, [isAuthenticated, isCheckingAuth, router]);

    if (isCheckingAuth || isLoading) {
      return <LoadingSpinner />;
    }

    if (!isAuthenticated && !localStorage.getItem('authUser')) {
      return null; 
    }

    return <Component {...props} />;
  };
}