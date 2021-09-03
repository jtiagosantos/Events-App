import { Link } from 'react-router-dom';

import './styles.scss';

export default function Navbar(): JSX.Element {
  return(
    <nav className="navbar navbar-expand-lg">
      <span className="navbar-brand text-white font-weight-bold">Events App</span>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars text-white"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/login">Entrar</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/register">Cadastrar</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};