import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from '../../services/firebase';

import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

import TitleApp from '../../components/TitleApp';

import './styles.scss';

export default function Login(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const auth = getAuth();

  async function logInto() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Login realizado com sucesso!');
      setTimeout(() => {
        dispatch({ type: 'LOG_IN', userEmail: email });
      }, 2000);
    }catch(err) {
      setMessage('E-mail e/ou senha incorretos!');
    };
  };

  return(
    <>
      <TitleApp />

      <div className="login-content d-flex align-items-center">

        {
          useSelector((state: RootStateOrAny) => state.userLogged) && <Redirect to="/" />
        }

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
            <Link to="/recover_password" className="mx-2">Recuperar senha</Link>
            <span className="text-white">&#9733;</span>
            <Link to="/register" className="mx-2">Fazer cadastro </Link>
          </div>
        </form>
        </div>
    </>
  );
};