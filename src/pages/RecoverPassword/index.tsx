import { useState } from 'react';

import { getAuth, sendPasswordResetEmail } from '../../services/firebase';

import './styles.scss';

export default function PasswordRecovery(): JSX.Element {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const auth = getAuth();

  async function recoverPassword() {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Enviamos um link no seu e-mail para recuperação da sua senha!');
    } catch(err) {
      setMessage('Verifique se o e-mail informado está correto!');
    }
  };

  return(
    <div className="password-recovery-content d-flex align-items-center">
      <form className="form-password-recovery text-center mx-auto">
        <h1 className="h3 pb-5 fw-bold text-white">Recuperação de senha</h1>

        <input 
          onChange={ e => setEmail(e.target.value) }
          value={ email }
          type="email" 
          className="form-control my-2" 
          placeholder="E-mail" 
        />

        <button onClick={ recoverPassword }className="w-100 btn btn-lg btn-password-recovery mt-3" type="button">Enviar</button>

        <div className="message-login text-white text-center my-4">
          <span>
            <strong>{ message }</strong>
          </span>
        </div>
      </form>
    </div>
  );
};