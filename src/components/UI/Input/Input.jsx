import React from 'react';
import './Input.sass';

const Input = ({className='',...props}) => {
  return(
    <div className={`${className} c-input__wrap`}>
      <input
        className='c-input'
        {...props}/>
    </div>
  );
}

const InputFormField = ({field, form:{errors, touched},...props}) => {
  return(
    <div className='c-input__wrap'>
      {touched[field.name] &&
        errors[field.name] && <div className="c-input__error">{errors[field.name]}</div>}
      <input
        className='c-input'
        {...field}
        {...props}/>
    </div>
  );
}

const InputFormPassword = ({field, form:{errors, touched},...props}) => {
  return(
    <div className='c-input__wrap'>
      {touched[field.name] &&
        errors[field.name] && <div className="c-input__error">{errors[field.name]}</div>}
      <input
        className='c-input'
        type="password"
        {...field}
        {...props}/>
    </div>
  );
}

const InputFormNumber = ({field, form:{errors, touched},...props}) => {
  return(
    <div className='c-input__wrap'>
      {touched[field.name] &&
        errors[field.name] && <div className="c-input__error">{errors[field.name]}</div>}
      <input
        className='c-input'
        type="number"
        {...field}
        {...props}/>
    </div>
  );
}

Input.FormField = InputFormField;
Input.FormPassword = InputFormPassword;
Input.FormNumber = InputFormNumber;
export default Input;