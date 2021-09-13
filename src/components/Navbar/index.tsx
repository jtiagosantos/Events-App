import { Link, useHistory } from 'react-router-dom';

import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

import './styles.scss';

export default function Navbar(): JSX.Element {
  const dispatch = useDispatch();

  const history = useHistory();

  function navigateToHomePage() {
    history.push('/');
  };

  return(
    <nav className="navbar navbar-expand-lg">
      <span 
        onClick={ navigateToHomePage } 
        className="navbar-brand text-white font-weight-bold">
          Events App
      </span>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars text-white"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {
            useSelector((state: RootStateOrAny) => state.userLogged) ?
          <>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/register_event">Publicar Evento</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/my_events">Meus Eventos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="" 
                onClick={ () => dispatch({ type: 'LOG_OUT' }) }>Sair</Link>
            </li>
          </>
           :
          <>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/login">Entrar</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/register">Cadastrar</Link>
            </li>
          </>
          }
        </ul>
      </div>
    </nav>
  );
};