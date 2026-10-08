import React from 'react';
import classNames from 'classnames';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isFullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  isFullWidth = false,
  className,
  id,
  ...restProps
}) => {
  const inputId = id || `input-${label.replace(/\s/g, '')}`;
  
  const containerClass = classNames(styles.container, {
    [styles.fullWidth]: isFullWidth,
  });
  
  const inputClass = classNames(styles.input, {
    [styles.inputError]: error,
  }, className);

  return (
    <div className={containerClass}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <input
        id={inputId}
        className={inputClass}
        aria-invalid={!!error}
        {...restProps}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default Input;