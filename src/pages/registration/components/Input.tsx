import React from 'react';

interface InputProps {
    id: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    className?: string;
    checked?: boolean;
}

const Input: React.FC<InputProps> = ({
    id,
    type,
    value,
    onChange,
    placeholder = '',
    required = true,
    className = '',
    checked = false,
}) => {
    return (
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
            checked={checked}
        />
    );
};

export default Input;
