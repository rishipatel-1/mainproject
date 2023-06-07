import React from 'react'
import './EmailVerifyPage.css'

const EmailVerificationSuccess: React.FC = () => {
  return (
    <div className='verifyEmailDiv'>
    <div className="email-verification-success">
      <h2>Email Verification Successful!</h2>
      <p>Your email has been successfully verified. You can now access your account.</p>
    </div>
    </div>
  )
}

export default EmailVerificationSuccess
