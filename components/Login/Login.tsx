"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../Auth/schemas";
import { useState } from "react";
import { LoginFormData } from "../Auth/types";
import PasswordInput from "../comman/passwordInput";
import AuthToggle from "../comman/authToggle";
import { motion } from "framer-motion";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  toggleAuthMode: () => void;
}

export function LoginForm({ onSubmit, toggleAuthMode }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });


  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center min-h-screen p-4 "
    >
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className=" font-extrabold text-gray-800 tracking-tight sm:text-[12px] md:text-3xl">
            Hello, Good Luck Begins
          </h2>
          <p className="text-xs sm:text-sm md:text-[14px] mt-2 text-gray-500">
            Welcome back! Please login to your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Mobile Number */}
          <div>
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mobile Number
            </label>
            <input
              id="mobileNumber"
              type="tel"
              {...register("mobileNumber")}
              maxLength={10}
              pattern="[6-9]{1}[0-9]{9}"
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value
                  .replace(/[^0-9]/g, "") // allow only numbers
                  .slice(0, 10); // limit to 10 digits
              }}
              className={`w-full px-4 py-2 rounded-lg shadow-sm text-gray-900
          ${errors.mobileNumber
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"} 
          border bg-white focus:outline-none focus:ring-2 transition-colors duration-200`}
            />

            {errors.mobileNumber && (
              <p className="mt-1 text-sm text-red-600">
                {errors.mobileNumber.message}
              </p>
            )}
          </div>

          {/* Password */}
          <PasswordInput
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            error={errors.password?.message}
            register={register}
            name="password"
            label="Password"
          />

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-2 cursor-pointer px-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400"
          >
            Sign in
          </motion.button>

        </form>

        {/* Toggle */}
        <div className="mt-6">
          <AuthToggle isLogin={true} toggleAuthMode={toggleAuthMode} />
        </div>
      </div>
    </motion.div>
  );
}
