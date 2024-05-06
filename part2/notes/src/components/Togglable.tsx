import React from "react";
import PropTypes from 'prop-types'
import { useImperativeHandle } from "react";
import { forwardRef } from "react";
import { useState } from "react";

export interface TogglableProps {
  buttonLabel: String;
  children: React.ReactNode;
}

export type VisibilityHandle = {
  toggleVisibility: () => void;
};

const Togglable = forwardRef(({ buttonLabel, children }: TogglableProps, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={{ display: visible ? "none" : "" }}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      {visible && (
        <div>
          {children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      )}
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable;
