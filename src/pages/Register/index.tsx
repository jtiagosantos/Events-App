import { useState } from 'react';
import { Link } from 'react-router-dom';

import { getAuth, createUserWithEmailAndPassword } from '../../services/firebase';

import TitleApp from '../../components/TitleApp';

import './styles.scss';

export default function Register(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  function registerInto() {
    setMessage('');
    setLoading(true);

    if(!email || !password) {
      setMessage('Informe um email e uma senha para cadastrar!');
      setLoading(false);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password).then(() => {
      setMessage('Usuário cadastrado com sucesso!');
      setLoading(false);
    }).catch(err => {
      if(err.message === 'Firebase: Error (auth/invalid-email).') {
        setMessage('Formato inválido para e-mail!');
      }else if(err.message === 'Firebase: Error (auth/weak-password).') {
        setMessage('A senha deve ter pelo menos 6 caracteres!');
      }else if(err.message === 'Firebase: Error (auth/email-already-in-use).') {
        setMessage('E-mail já utilizado em outra conta!');
      }else {
        setMessage('Não foi possível cadastrar. Tente novamente mais tarde!')
      }
      setLoading(false);
    })
  };

  return(
    <>
      <TitleApp />

      <div className="register-content d-flex align-items-center">
        <form className="form-signin text-center mx-auto">
          <h1 className="h3 mb-3 fw-bold text-white">Cadastro</h1>

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

          {!loading && <button onClick={ registerInto } className="w-100 btn btn-lg btn-register mt-3" type="button">Cadastrar</button>}

          {loading && (
            <button className="w-100 btn btn-lg btn-register mt-3" type="button" disabled>
              <span className="spinner-border spinner-border-sm mr-2 m-1 h6" role="status" aria-hidden="true"></span>
              Cadastrar...
            </button>
          )}

          <div className="message-login text-white text-center my-4">
            <span>
              <strong>{ message }</strong>
            </span>
          </div>

          <div className="option-register mt-5 text-center">
            <Link to="/login"  className="mx-2">Já tem uma conta? Faça login!</Link>
          </div>
        </form>
      </div>
    </>
  );
};