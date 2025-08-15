"use client";
import { useState, useEffect } from 'react';
import { LoginForm } from '../Login/Login';
import { RegisterForm } from '../Register/RegisterForm';
import { loginSuccess } from '@/store/authSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedWelcome from '../comman/AnimatedWelcome';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  
  const toggleAuthMode = () => setIsLogin(!isLogin);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000); // 5 seconds
    
    return () => clearTimeout(timer);
  }, []);

  const onLogin = (data: any) => {
    console.log("Login data:", data);
    dispatch(loginSuccess({
      mobile: data.mobile,
      password: data.password,
    }));
    router.push("/home");
  };

  const onRegister = (data: any) => {
    console.log("Register data:", data);
    dispatch(loginSuccess({
      mobile: data.mobile,
      password: data.password,
    }));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-300 to-amber-400">
      <AnimatePresence>
        {showWelcome ? (
          <>
            <AnimatedWelcome />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full backdrop-blur-md"
          >
            {isLogin ? (
              <LoginForm onSubmit={onLogin} toggleAuthMode={toggleAuthMode} />
            ) : (
              <RegisterForm onSubmit={onRegister} toggleAuthMode={toggleAuthMode} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}