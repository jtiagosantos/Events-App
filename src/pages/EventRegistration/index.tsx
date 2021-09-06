import { useState } from 'react';
import { Link } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from '../../services/firebase';

import { useSelector } from 'react-redux';

import Navbar from '../../components/Navbar';

import './styles.scss';

export default function EventRegistration(): JSX.Element {
  return(
    <>
      <Navbar />

      <div className="col-12 content">
        <div className="row">
          <h3 className="mx-auto font-weight-bold mt-2">Novo evento</h3>
        </div>

        <form>
          <div className="form-group">
            <label>Título:</label>
            <input type="text" className="form-control" />
          </div>

          <div className="form-group">
            <label>Tipo:</label>
            <select className="form-control">
              <option disabled selected value="">-- Selecione um tipo --</option>
              <option>Festa</option>
              <option>Teatro</option>
              <option>Show</option>
              <option>Evento</option>
            </select>
          </div>

          <div className="form-group">
            <label>Descrição:</label>
            <textarea rows={4} className="form-control"></textarea>
          </div>

          <div className="form-group row">
            <div className="col-6">
              <label>Data:</label>
              <input type="date" className="form-control" />
            </div>

            <div className="col-6">
              <label>Hora:</label>
              <input type="time" className="form-control" />
            </div>
          </div>

          <div className="form-group">
            <label>Upload da foto:</label>
            <input type="file" className="form-control" />
          </div>

          <button className="w-100 btn btn-lg btn-publish mt-3 mb-2" type="button">Cadastrar</button>
        </form>
      </div>
    </>
  );
};