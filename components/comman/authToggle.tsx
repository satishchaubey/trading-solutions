import { AuthToggleProps } from "../Auth/types";

const AuthToggle = ({ isLogin, toggleAuthMode }: AuthToggleProps) => (
  <div className="text-center text-sm text-gray-600">
    {isLogin ? "Don't have an account?" : "I have an account?"}{' '}
    <button
      type="button"
      onClick={toggleAuthMode}
      className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
    >
      {isLogin ? 'Register' : 'Login'}
    </button>
  </div>
);

export default AuthToggle;  