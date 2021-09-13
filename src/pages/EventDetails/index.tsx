import { useState } from 'react';
import { Link } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from '../../services/firebase';

import { useSelector, RootStateOrAny } from 'react-redux';

import Navbar from '../../components/Navbar';

import './styles.scss';

export default function EventDetails(): JSX.Element {
  return(
    <>
      <Navbar />

      <div className="container-fluid">
        <div className="row">
          <img src="https://via.placeholder.com/150" className="img-card-details" alt="Banner" />
        </div>

        <div className="row mt-5 d-flex justify-content-around">
          <div className="col-md-3 col-sm-12 box-info p-3 my-2">
            <i className="fas fa-ticket-alt fa-2x"></i>
            <h5><strong>Tipo</strong></h5>
            <span className="mt-3">Festa</span>
          </div>

          <div className="col-md-3 col-sm-12 box-info p-3 my-2">
            <i className="fas fa-calendar-alt fa-2x"></i>
            <h5><strong>Data</strong></h5>
            <span className="mt-3">13/09/2021</span>
          </div>
          
          <div className="col-md-3 col-sm-12 box-info p-3 my-2">
            <i className="fas fa-clock fa-2x"></i>
            <h5><strong>Hora</strong></h5>
            <span className="mt-3">13:25</span>
          </div>
        </div>

        <div className="row box-details mt-5">
          <h5 className="mx-auto"><strong>Detalhes do Evento</strong></h5>
          <p className="text-justify p-3">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi laborum, consequuntur expedita sunt placeat cum excepturi, ad sint voluptatem fuga quidem at dolore omnis quas minima id dolores asperiores repellat!
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus tempora explicabo voluptatem, praesentium quidem sunt magnam suscipit totam laborum repudiandae nisi soluta commodi. Ducimus, aut molestias corporis commodi neque cum?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus pariatur nobis et vero dolorem obcaecati veritatis consequuntur commodi maiores vitae cupiditate, aspernatur nemo magnam fugiat autem aperiam accusamus dicta. Saepe.
          </p>
        </div>

        <Link to="" className="btn-edit">
          <i className="fas fa-pen-square fa-3x"></i>
        </Link>
      </div>
    </>
  );
};