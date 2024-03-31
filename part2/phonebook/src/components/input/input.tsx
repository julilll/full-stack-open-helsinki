import React, { ChangeEventHandler } from "react";

const Input = ({
  label,
  value,
  onChange,
  type,
}: {
  label: string;
  value: any;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type: HTMLInputElement['type']
}) => (
  <div>
    {label}: <input value={value} onChange={onChange} />
  </div>
);

export default Input;
