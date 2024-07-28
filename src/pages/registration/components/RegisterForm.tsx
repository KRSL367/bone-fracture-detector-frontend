import React, { useState } from "react";

// Define the interface for the props
interface RegisterFormProps {
  onSubmit: (formData: {
    username: string;
    email: string;
    password: string;
  }) => void;
}

// Component definition with props
const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    onSubmit({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="firstname"
          className="block text-sm font-medium text-gray-700"
        >
          First name
        </label>
        <input
          type="text"
          id="firstname"
          value={formData.username}
          onChange={handleChange}
          placeholder="Jesse"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label
          htmlFor="lastname"
          className="block text-sm font-medium text-gray-700"
        >
          Last name
        </label>
        <input
          type="text"
          id="lastname"
          value={formData.username}
          onChange={handleChange}
          placeholder="Pinkman"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Jessepinkman123"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="jesse.pinkman@example.com"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="showPassword"
          checked={showPassword}
          onChange={toggleShowPassword}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
        <label
          htmlFor="showPassword"
          className="ml-2 block text-sm text-gray-900"
        >
          Show Password
        </label>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
