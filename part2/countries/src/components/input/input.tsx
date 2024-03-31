import { ChangeEventHandler } from "react";

interface InputProps {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Input = ({ label, value, onChange }: InputProps) => (
  <div>
    {label}: <input value={value} onChange={onChange} type="text" />
  </div>
);

export default Input;
