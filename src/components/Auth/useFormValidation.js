import React from "react";

function useFormValidation(initialState,validate, authenticate) {
  const [values, setValues] = React.useState(initialState);
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setSubmitting] = React.useState(false)

  React.useEffect(()=>{
    if(isSubmitting){
     const noErrors = Object.keys(errors).length === 0
     if(noErrors)
      console.log('authenticated')
       authenticate();
       setSubmitting(false)
     }else{
       setSubmitting(false)
     }
  },[errors]);

  const handleChange=event=>{
    event.persist();
    setValues(preValues=>({
      ...preValues,
      [event.target.name]:event.target.value
    }))
  }

  const handlerBlur = ()=>{
    const validationErrors = validate(values)
    setErrors(validationErrors)
  }

  const handleSubmit = event =>{
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
  }

  return{
    handleChange,
    handleSubmit,
    handlerBlur,
    values,
    errors,
    isSubmitting
  }
}

export default useFormValidation;
