// components/Input.tsx
import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }, ref) => {
    return <input ref={ref} className={className} {...rest} />;
  }
);

Input.displayName = "Input";
export default Input;
