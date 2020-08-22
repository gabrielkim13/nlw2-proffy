/* eslint-disable react/jsx-props-no-spreading */
import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, name, ...rest }: TextareaProps) => (
  <div className="textarea-block">
    <label htmlFor={name}>{label}</label>
    <textarea id={name} {...rest} />
  </div>
);

export default Textarea;
