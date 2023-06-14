import React, { useState } from 'react';
import classNames from 'classnames';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => Promise<void>;
  disabled?: boolean;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, className }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await onClick();
    setIsLoading(false);
  };

  const buttonClasses = classNames(
    'px-6 py-2 bg-persian-red-600 hover:bg-persian-red-700 text-white font-semibold rounded-full',
    {
      'opacity-50 cursor-not-allowed': disabled || isLoading,
    }
  );

  return (
    <button
      className={`${buttonClasses} ${className}`}
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};