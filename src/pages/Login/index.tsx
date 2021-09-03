import { useState } from 'react';
import { Link } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from '../../services/firebase';

import './styles.scss';

export default function Login(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const auth = getAuth();

  async function logInto() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Login realizado com sucesso!');
    }catch(err) {
      setMessage('E-mail e/ou senha incorretos!');
    };
  };

  return(
    <div className="login-content d-flex align-items-center">
      <form className="form-signin text-center mx-auto">
        <h1 className="h3 mb-3 fw-bold text-white">Login</h1>

        <input 
          onChange={ e => setEmail(e.target.value) } 
          value={ email } 
          type="email" 
          className="form-control my-2" 
          placeholder="E-mail" 
        />
        <input 
          onChange={ e => setPassword(e.target.value) }
          value={ password }
          type="password" 
          className="form-control my-2" 
          placeholder="Senha" 
        />

        <button onClick={ logInto } className="w-100 btn btn-lg btn-login mt-3" type="button">Entrar</button>

        <div className="message-login text-white text-center my-4">
          <span>
            <strong>{ message }</strong>
          </span>
        </div>

        <div className="options-login mt-5 text-center">
          <a href="#" className="mx-2">Recuperar senha</a>
          <span className="text-white">&#9733;</span>
          <Link to="/register" className="mx-2">Fazer cadastro </Link>
        </div>
      </form>
    </div>
  );
};