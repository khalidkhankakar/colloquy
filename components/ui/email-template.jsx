import React from 'react';
export const EmailTemplate = ({
  otp,
  fname='',
  lname=''
}) => (
  <div className='font-rubik'>
    <h1>Welcome, {fname} {lname}!</h1>
    <p>Your OTP verification code is {otp}</p>
  </div>
);
