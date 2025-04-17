import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
    const [isSignIn,setIsSignIn] = useState(true)
    const toggleSignInForm = () => {
        setIsSignIn(!isSignIn)
    }
  return (
    <div>
        <Header />
        <div className='absolute'>
            <img 
                src='https://assets.nflxext.com/ffe/siteui/vlv3/fa4630b1-ca1e-4788-94a9-eccef9f7af86/web/IN-en-20250407-TRIFECTA-perspective_43f6a235-9f3d-47ef-87e0-46185ab6a7e0_small.jpg'
                alt='login-background'
            />
        </div>
        <form className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80'>
            <h1 className='font-bold text-3xl py-4'>{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
            {!isSignIn && <input type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700' />}
            <input type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700' />
            <input type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700' />
            <button className='p-4 my-6 bg-red-700 w-full rounded-lg'>{isSignIn ? 'Sign In' : 'Sign Up'}</button>
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
                {isSignIn
                    ? 'Are you new to Netflix? Sign Up Now'
                    : 'Already registered? Sign In Now'
                }
            </p>
        </form>
    </div>
  )
}

export default Login