import React from "react";

const FormRow = ({
  type,
  name,
  labelText,
  defaulyValue,
  className,
  labelClass,
  readOnly,
  onBlur,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {labelText || name}{" "}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaulyValue || ""}
        className={className}
        readOnly={readOnly}
        onBlur={onBlur}
        onChange={onChange}
      />
      <br /> <br />
    </div>
  );
};

export default FormRow;
