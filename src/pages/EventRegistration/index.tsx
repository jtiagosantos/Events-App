import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, RootStateOrAny } from 'react-redux';

import { getFirestore, collection, addDoc } from "firebase/firestore";

import Navbar from '../../components/Navbar';

import './styles.scss';

export default function EventRegistration(): JSX.Element {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [photo, setPhoto] = useState<File | null>();

  const userEmail = useSelector((state: RootStateOrAny) => state.userEmail);

  const db = getFirestore();

  async function registerEvent() {

    try {
      await addDoc(collection(db, "events"), {
        title,
        type,
        details,
        date,
        time,
        user: userEmail,
        views: 0,
        photo: photo ? photo?.name : '',
        public: 0,
        createdAt: new Date()
      });
      alert('Evento publicado!');
    } catch(err) {
      alert(err)
    }
  };

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
            <input 
              type="text" 
              className="form-control" 
              onChange={ e => setTitle(e.target.value) } />
          </div>

          <div className="form-group">
            <label>Tipo:</label>
            <select className="form-control" onChange={ e => setType(e.target.value) } >
              <option disabled selected value="">-- Selecione um tipo --</option>
              <option>Festa</option>
              <option>Teatro</option>
              <option>Show</option>
              <option>Evento</option>
            </select>
          </div>

          <div className="form-group">
            <label>Descrição:</label>
            <textarea 
              rows={4} 
              className="form-control"
              onChange={ e => setDetails(e.target.value) }>
            </textarea>
          </div>

          <div className="form-group row">
            <div className="col-6">
              <label>Data:</label>
              <input 
                type="date" 
                className="form-control"
                onChange={ e => setDate(e.target.value) } />
            </div>

            <div className="col-6">
              <label>Hora:</label>
              <input 
                type="time" 
                className="form-control"
                onChange={ e => setTime(e.target.value) } />
            </div>
          </div>

          <div className="form-group">
            <label>Upload da foto:</label>
            <input 
              type="file" 
              className="form-control"
              onChange={ e => setPhoto(e.target.files?.[0]) } />
          </div>

          <button 
            onClick={ registerEvent }
            className="w-100 btn btn-lg btn-publish mt-3 mb-2" 
            type="button">Cadastrar</button>
        </form>
      </div>
    </>
  );
};