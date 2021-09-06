import { useHistory } from 'react-router-dom';

import './styles.scss';

export default function TitleApp(): JSX.Element {
  const history = useHistory();

  function navigateToHomePage() {
    history.push('/');
  };

  return(
    <nav className="navbar navbar-expand-lg">
      <span 
        className="navbar-brand text-white font-weight-bold"
        onClick={ navigateToHomePage }>Events App</span>
    </nav>
  );
};