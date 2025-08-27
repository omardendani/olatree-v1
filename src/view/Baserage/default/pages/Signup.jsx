import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import useAuth from '../../../../hooks/useAuth';

export default function Signup() {/*
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { handleSignup, loading, error } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const success = await handleSignup(
      nameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value
    );
    if (success) {
      navigate('/user');
    }
  };*/

  return (
    <form className="form-login-signup">
      <div className="form-titles">
        <p className="form-title">Welcome to our platform!</p>
        <p className="form-subtitle">Create an account to get started</p>
      </div>

      <div className="inputs-form">
        <div className="the-form-input-styl-1">
          <label className="lable-of-input-styl-1" htmlFor="name">Full Name</label>
          <input
            className="input-styl-1"
            type="text"
            id="signup_name"
            placeholder="Enter your full name"
            required
          />
          <span className="msg-of-input-styl-1 invisible">message</span>
        </div>
        <div className="the-form-input-styl-1">
          <label className="lable-of-input-styl-1" htmlFor="email">E-mail</label>
          <input
            className="input-styl-1"
            type="email"
            id="signup_mail"
            placeholder="Enter your e-mail"
            required
          />
          <span className="msg-of-input-styl-1 invisible">message</span>
        </div>
        <div className="the-form-input-styl-1">
          <label className="lable-of-input-styl-1" htmlFor="password">Password</label>
          <input
            className="input-styl-1"
            type="password"
            id="signup_password"
            placeholder="Enter your password"
            required
          />
          <span className="msg-of-input-styl-1 invisible">message</span>
        </div>

        {/*error && <div className="error-message">{error}</div>*/}
        <button type="submit" className="primary-btn-submit-form-styl-1">
          Sign Up
        </button>
      </div>

      <div className="down-text-form">
        <p>Already have an account? <Link to="/login">Log in now</Link></p>
      </div>
    </form>
  );
}
