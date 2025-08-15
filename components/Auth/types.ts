import { loginSchema, registerSchema } from "./schemas";
import { z } from "zod";


export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

export interface AuthToggleProps {
  isLogin: boolean;
  toggleAuthMode: () => void;
}

export interface PasswordInputProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  error?: string;
  register: any;
  name: string;
  label: string;
}