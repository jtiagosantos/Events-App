import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

export default function EventCard(): JSX.Element {
  return(
    <div className="col-md-3 col-sm-12">
      <img src="https://via.placeholder.com/500x500" className="card-img-top img-card" alt="Imagem do Evento" />

      <div className="card-body">
        <h5>Título do Evento</h5>
        <p className="card-text text-justify">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt doloribus explicabo, natus maiores ratione sed. Debitis, facere dolorum consequatur ullam odio fuga, ducimus dolore perspiciatis unde illum excepturi soluta recusandae!
        </p>

        <div className="row footer-card d-flex align-items-center">
          <div className="col-6">
            <Link to="#" className="btn btn-sm btn-details">+ detalhes</Link>
          </div>

          <div className="col-6 text-right">
            <i className="fas fa-eye"></i><span>2019</span>
          </div>
        </div>
      </div>
    </div>
  );
};