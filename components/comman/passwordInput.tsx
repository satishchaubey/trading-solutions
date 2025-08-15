import { FiEye, FiEyeOff } from "react-icons/fi";
import { PasswordInputProps } from "../Auth/types";

const PasswordInput = ({
  showPassword,
  setShowPassword,
  error,
  register,
  name,
  label
}: PasswordInputProps) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <div className="mt-1 relative">
      <input
        id={name}
        type={showPassword ? "text" : "password"}
        {...register(name)}
        className={`w-full px-4 py-2 rounded-lg shadow-sm text-gray-900
          ${error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"} 
          border bg-white focus:outline-none focus:ring-2 transition-colors duration-200`}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer" 
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <FiEyeOff className="h-5 w-5" />
        ) : (
          <FiEye className="h-5 w-5" />
        )}
      </button>
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

export default PasswordInput;
