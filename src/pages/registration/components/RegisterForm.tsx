import React, { useState } from "react";
import Label from "./Label";
import Input from "./Input";

interface RegisterFormProps {
  onSubmit: (formData: {
    username: string;
    email: string;
    password: string;
  }) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
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
        <Label htmlFor="firstname">First name</Label>
        <Input
          id="firstname"
          type="text"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="Jesse"
          required
        />
      </div>

      <div>
        <Label htmlFor="lastname">Last name</Label>
        <Input
          id="lastname"
          type="text"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Pinkman"
          required
        />
      </div>

      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Jessepinkman123"
          required
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="jesse.pinkman@example.com"
          required
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          required
        />
      </div>

      <div className="flex items-center">
        <Input
          id="showPassword"
          type="checkbox"
          value={showPassword.toString()}
          onChange={toggleShowPassword}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
        <Label
          htmlFor="showPassword"
          className="ml-2 block text-sm text-gray-900"
        >
          Show Password
        </Label>
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
