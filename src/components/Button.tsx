import React, { useState } from 'react';
import classNames from 'classnames';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => Promise<void>;
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await onClick();
    setIsLoading(false);
  };

  const buttonClasses = classNames(
    'px-4 py-1 bg-persian-red-600 hover:bg-persian-red-700 text-white font-semibold rounded-full',
    {
      'opacity-50 cursor-not-allowed': disabled || isLoading,
    }
  );

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};