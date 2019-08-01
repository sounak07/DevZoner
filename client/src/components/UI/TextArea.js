import React from "react";
import classnames from "classnames";

const textArea = ({ name, placeholder, value, error, info, onChange }) => {
  return (
    <div className="form-group">
      <textarea
        value={value}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default textArea;
