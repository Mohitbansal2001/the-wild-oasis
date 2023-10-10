import React from "react";

function FormInputs({ label,type,id,register,required,...props }) {
  return (
    <>
      <div className="col-4 ">
        <label className="form-label" htmlFor={id}>
          {label}
        </label>
      </div>
      <div className="col-6">
        <input type={type} id={id} {...props}{...register({label,required})} className="form-control py-3  w-50 " />
      </div>
    </>
  );
}

export default FormInputs;
