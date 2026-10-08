import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'doll';
  size?: 'small' | 'medium' | 'large' | 'as';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  children,
  className,
  disabled,
  ...restProps
}) => {
  const buttonClass = classNames(
    styles.button,
    styles[variant],
    styles[size],
    {
      [styles.loading]: isLoading,
      [styles.disabled]: disabled || isLoading,
    },
    className
  );

  return (
    <button
      className={buttonClass}
      disabled={disabled || isLoading}
      {...restProps}
    >
      {isLoading ? 'Загрузка...' : children}
    </button>
  );
};

export default Button;

