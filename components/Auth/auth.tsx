"use client";
import { useState, useEffect } from 'react';
import { LoginForm } from '../Login/Login';
import { RegisterForm } from '../Register/RegisterForm';
import { loginSuccess } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedWelcome from '../comman/AnimatedWelcome';
import { loginUser } from '@/store/auth/authThunks';
import { useAppDispatch } from '@/store/store';


export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const toggleAuthMode = () => setIsLogin(!isLogin);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 1000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const onLogin = (data: any) => {
    console.log("Login data:", data);
    dispatch(loginUser(data));
    router.push("/home");
  };

  const onRegister = (data: any) => {
    dispatch(loginUser(data));
    router.push("/home");
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