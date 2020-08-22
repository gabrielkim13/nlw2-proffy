/* eslint-disable react/jsx-props-no-spreading */
import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const Input: React.FC<InputProps> = ({ label, name, ...rest }: InputProps) => (
  <div className="input-block">
    <label htmlFor={name}>{label}</label>
    <input id={name} type="text" {...rest} />
  </div>
);

export default Input;
