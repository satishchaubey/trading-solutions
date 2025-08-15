'use client';

import { initializeAuth } from '@/store/authSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ResponsiveMenu from '@/components/MenuBar/responsive-menu';
import LoadingSpinner from '@/components/comman/LoadingSpinner';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useSelector((state: any) => state.auth);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const authUser = localStorage.getItem('authUser');
    if (!isAuthenticated && authUser) {
      dispatch(initializeAuth());
    }
    setIsCheckingAuth(false);
  }, [isAuthenticated, dispatch]);



  return (
    <>
      {isAuthenticated && <ResponsiveMenu />}
      {children}
    </>
  );
};

export default Layout;