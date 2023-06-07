import React, { type FormEvent } from 'react'

// import { validate as validateEmail } from "email-validator";

import { Toaster } from 'react-hot-toast'

const Registerr = () => {
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    // Your logic here
  }

  return (
    <>
      <Toaster />
      <div className="signup-form">
        <div className="title">Signup</div>
        <form action="#">
          <div className="input-boxes">
            <div className="input-box">
              <i className="fas fa-user" />
              <input type="text" placeholder="Enter your name" required />
            </div>
            <div className="input-box">
              <i className="fas fa-envelope" />
              <input type="text" placeholder="Enter your email" />
            </div>
            <div className="input-box">
              <i className="fas fa-lock" />
              <input type="password" placeholder="Enter your password" />
            </div>
            <div className="button input-box">
              <input type="submit" value="Submit" onClick={handleSubmit} />
            </div>
            <div className="text sign-up-text">
              Already have an account? <label htmlFor="flip">Login now</label>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Registerr
