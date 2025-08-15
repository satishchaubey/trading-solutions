"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema } from "../Auth/schemas";
import {
  AuthToggleProps,
  PasswordInputProps,
  RegisterFormData,
} from "../Auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "../comman/passwordInput";
import AuthToggle from "../comman/authToggle";
import { motion } from "framer-motion";

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  toggleAuthMode: () => void;
}

export function RegisterForm({
  onSubmit,
  toggleAuthMode,
}: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <div className="flex items-center justify-center min-h-screen p-4 ">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className=" bg-white p-6 rounded-xl shadow-lg space-y-6 w-full max-w-md border border-gray-200"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            Create Your Account
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Fill in your details to get started
          </p>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ staggerChildren: 0.1 }}
        >
          {/* Mobile Number */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mobile Number
            </label>
            <input
              id="mobileNumber"
              type="text"
              {...register("mobileNumber")}
              className={`w-full px-3 py-2 border ${errors.mobileNumber ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.mobileNumber && (
              <p className="mt-1 text-sm text-red-600">
                {errors.mobileNumber.message}
              </p>
            )}
          </motion.div>

          {/* Password */}
          <PasswordInput
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            error={errors.password?.message}
            register={register}
            name="password"
            label="Password"
          />

          {/* Confirm Password */}
          <PasswordInput
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
            error={errors.confirmPassword?.message}
            register={register}
            name="confirmPassword"
            label="Confirm Password"
          />

          {/* Invitation Code */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <label
              htmlFor="invitationCode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Invitation Code
            </label>
            <input
              id="invitationCode"
              type="text"
              {...register("invitationCode")}
              className={`w-full px-3 py-2 border ${errors.invitationCode ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.invitationCode && (
              <p className="mt-1 text-sm text-red-600">
                {errors.invitationCode.message}
              </p>
            )}
          </motion.div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <button
            type="submit"
            className="w-full py-2 cursor-pointer px-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400"
          >
            Register
          </button>
        </motion.div>

        {/* Auth Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <AuthToggle isLogin={false} toggleAuthMode={toggleAuthMode} />
        </motion.div>
      </motion.form>
    </div>
  );
}
