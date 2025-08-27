import { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import useAuth from '../../../../hooks/useAuth';

export default function Login() {/*
  const { handleLogin, user, loading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirige si l'utilisateur est déjà connecté
    if (user) {
      navigate('/user');
    }
  }, [user, navigate]);

  const emailRef = useRef();
  const passwordRef = useRef();

  const onSubmit = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const { success, message } = await handleLogin(email, password);
      if (success) {
        //navigate('/user');
        console.log('Login :', message);
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };*/

  return (
    <form className="form-login-signup" >
      <div className="form-titles">
        <p className="form-title">Hey, let's connect!</p>
        <p className="form-subtitle">Connect to your account</p>
      </div>

      <div className="inputs-form">
        <div className="the-form-input-styl-1">
          <label className="lable-of-input-styl-1" htmlFor="email">E-mail</label>
          <input
            className="input-styl-1"
            type="email"
            id="login_mail"
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
            id="login_password"
            placeholder="Enter your password"
            required
          />
          <span className="msg-of-input-styl-1 invisible">message</span>
        </div>

        {/*error && <div className="error-message">{error}</div>*/}
        <button type="submit" className="primary-btn-submit-form-styl-1">
          Login
        </button>
      </div>

      <div className="down-text-form">
        <p>Do not have an account? <Link to="/signup">Create an account now</Link></p>
      </div>
    </form>
  );
}
