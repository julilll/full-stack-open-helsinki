import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import { Person } from "../../App";
import Input from "../input/input";

const FormPersonNew = ({
  onSubmit,
  nameValue,
  onNameChange,
  numberValue,
  onNumberChange,
}: {
  onSubmit: FormEventHandler<HTMLFormElement>;
  nameValue: Person['name'];
  onNameChange: ChangeEventHandler<HTMLInputElement>;
  numberValue: Person['number'];
  onNumberChange: ChangeEventHandler<HTMLInputElement>;
}) => {

  return (
    <form onSubmit={onSubmit}>
      <Input
        label="Name"
        value={nameValue}
        onChange={onNameChange}
        type="text"
      />
      <Input
        label="Number"
        value={numberValue}
        onChange={onNumberChange}
        type="tel"
      />
      <div>
        <button type="submit" disabled={!nameValue || !numberValue}>
          add
        </button>
      </div>
    </form>
  );
};

export default FormPersonNew;
