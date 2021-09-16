import { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { useSelector, RootStateOrAny } from 'react-redux';

import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import Navbar from '../../components/Navbar';

import './styles.scss';

export default function EventRegistration(): JSX.Element {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [photo, setPhoto] = useState<File | null>();
  const [loading, setLoading] = useState(false);

  const userEmail = useSelector((state: RootStateOrAny) => state.userEmail);

  const db = getFirestore();
  const firebaseApp = getApp();
  const storage = getStorage(firebaseApp, "gs://events-app-704a6.appspot.com");
  const storageReference = ref(storage, `images/${photo?.name}`);

  async function fileToBlob(file:any) {
    return new Blob([new Uint8Array(await file.arrayBuffer())], {type: file.type });
  }

  async function registerEvent() {
    setLoading(true);
    
    try {
      await addDoc(collection(db, "events"), {
        id: uuidv4(),
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
      await uploadBytes(storageReference, await fileToBlob(photo));
      
      setLoading(false);
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

          {!loading && (
            <button 
              onClick={ registerEvent }
              className="w-100 btn btn-lg btn-publish mt-3 mb-2" 
              type="button">Publicar
            </button>
          )}
          
          {loading && (
            <button className="w-100 btn btn-lg btn-publish mt-3 mb-2" type="button" disabled>
              <span className="spinner-border spinner-border-sm mr-2 m-1 h6" role="status" aria-hidden="true"></span>
              Publicando...
            </button>
          )}
        </form>
      </div>
    </>
  );
};