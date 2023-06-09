import { FormEventHandler, useState, useRef } from 'react';
import classes from './auth-form.module.css';
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const createUser = async (email: string, password: string) => {

  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong")
  }
  return data
}

function AuthForm() {
  const { data: session,status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  if (session) {
    router.replace('/profile')
  }
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler: FormEventHandler = async (event) => {
    event.preventDefault()

    const enteredEmail = emailInputRef.current!.value
    const enteredPassword = passwordInputRef.current!.value

    if (isLogin) {
      setLoading(true)
      console.log("logging in");
      const result = await signIn('credentials', {
        redirect: false,
        email:enteredEmail,
        password: enteredPassword
      })


    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword)
      } catch (error) {
        console.log(error);

      }
    }
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
      {loading && <p>Loading...</p> }
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
