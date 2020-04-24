import React from "react";

import firebase from '../../firebase'

import userFormValidation from './useFormValidation'
import validateLogin from './validateLogin'

const INITIAL_STATE ={
  name:"",
  email:"",
  password:""
}

const Login = (props) => {
  const [login,setLogin] = React.useState(true);
  const [firebaseError,setFirebaseError] = React.useState(null)
  const {
    handleChange,
    handleSubmit,
    handlerBlur,
    values,
    errors,
    isSubmitting
  } = userFormValidation(INITIAL_STATE,validateLogin,authenticateUser);

  async function authenticateUser(){
    const {name, email, password} = values;
    try{
      login
        ? await firebase.login(email, password)
        : await firebase.register(name,email,password)
        props.history.push('/');
      }catch(err){
      setFirebaseError(err.message)
    }
      
  }

  return (
    <div>
      <h2 className="mv3">{login?'Login':'Create Account'}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
       {!login &&  <input 
          type="text"
          placeholder="Your name"
          autoComplete="off" 
          name='name'
          onChange={handleChange}
          value={values.name}
        />}

        <input 
          type="email"
          placeholder="Your email"
          autoComplete="off"  
          name="email"
          onChange={handleChange}
          value={values.email}
          onBlur={handlerBlur}
          className={errors.email && 'error-input'}
        />
        {errors.email && <p className='error-text'>{errors.email}</p>}

        <input 
          type="password"
          placeholder="Choose a secure password"
          name='password'
          onChange={handleChange}
          onBlur={handlerBlur}
          value={values.password}
          className={errors.password && 'error-input'}

        />
        {errors.password && <p className='error-text'>{errors.password}</p>}
        {firebaseError && <p className='error-text'>{firebaseError}</p>}

        <div className="flex mt3">
          <button
            disabled={isSubmitting}
            style={{background: isSubmitting? "grey" : "orange"}}
            type="submit"
            className="button pointer mr2"
          >
            Submit
          </button>

          <button
            type="button"
            className="pointer button"
            onClick={()=>setLogin(prevLogin => !prevLogin)}
          >
            {login
              ?"need to create an account?"
              :"already have an account?"
            }
          </button>
        </div>

      </form>
    </div>
  );
}

export default Login;
