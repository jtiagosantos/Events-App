import './styles.scss';

export default function Login(): JSX.Element {
  return(
    <div className="login-content d-flex align-items-center">
      <form className="form-signin text-center mx-auto">
        <h1 className="h3 mb-3 fw-bold text-white">Login</h1>

        <input type="email" className="form-control my-2" id="floatingInput" placeholder="E-mail" />
        <input type="password" className="form-control my-2" id="floatingPassword" placeholder="Senha" />

        <button className="w-100 btn btn-lg btn-login mt-3" type="submit">Entrar</button>

        <div className="message-login text-white text-center my-4">
          <span>
            <strong>Wow!</strong> Login realizado com sucesso!
          </span>
          <br /> 
          <span>
            <strong>Ops!</strong> E-mail e/ou senha incorretos!
          </span>
        </div>

        <div className="options-login mt-5 text-center">
          <a href="#" className="mx-2">Recuperar senha</a>
          <span className="text-white">&#9733;</span>
          <a href="#" className="mx-2">Fazer cadastro</a>
        </div>
      </form>
    </div>
  );
};