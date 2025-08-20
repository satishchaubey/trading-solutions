'use client';

import { initializeAuth } from '@/store/auth';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import ResponsiveMenu from '@/components/MenuBar/responsive-menu';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useSelector((state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth?.isLoading,
  }),shallowEqual);


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