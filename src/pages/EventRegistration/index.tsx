import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { useSelector, RootStateOrAny } from 'react-redux';

import { collection, query, getDocs, getFirestore, where, doc, updateDoc, addDoc } from "firebase/firestore";
import { getApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import Navbar from '../../components/Navbar';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

import './styles.scss';

type eventProps = {
  id: string,
  title: string,
  type: string,
  details: string,
  date: Date,
  time: Date,
  user: string,
  views: number,
  newImage: string,
  public: number,
  createdAt: Date
};

export default function EventRegistration({ match }:any): JSX.Element {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState<File | null>();
  const [newImage, setNewImage] = useState<File | null>();

  const [event, setEvent] = useState<eventProps | any>();
  const [, setUrlImage] = useState('');
  const [idDocument, setIdDocument] = useState('');

  const userEmail = useSelector((state: RootStateOrAny) => state.userEmail);

  const db = getFirestore();
  const firebaseApp = getApp();
  const storage = getStorage(firebaseApp, "gs://events-app-704a6.appspot.com");
  const storageReference = ref(storage, `images/${newImage?.name}`);

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
        photo: newImage ? newImage?.name : '',
        public: 0,
        createdAt: new Date()
      });
      await uploadBytes(storageReference, await fileToBlob(newImage));
      
      toast('Evento publicado!',
        {
            position: "top-center",
            style: {
            borderRadius: '10px',
            background: '#fff',
            color: '#333',
            },
        }
      );
    } catch(err) {
      alert(err)
    }

    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      if(match.params.id) {
        const data = await getDocs(query(collection(db, "events"), where("id", "==", match.params.id)));
        data.forEach(document => {
          setEvent(document.data());
          setTitle(document.data().title);
          setType(document.data().type);
          setDetails(document.data().details);
          setDate(document.data().date);
          setTime(document.data().time);
          setCurrentImage(document.data().photo);

          setIdDocument(document.id);
        });

        if(idDocument) {
          const eventReference = doc(db, "events", idDocument);
          updateDoc(eventReference, {
            views: event.views + 1
          });
        }

        if(event?.newImage) {
          const url = await getDownloadURL(ref(storage, `images/${event.newImage}`));
          setUrlImage(url);
          setLoading(false);
        }
      }
    })();
  }, [idDocument]);  

  async function updateEvent() {
    setLoading(true);

    if(newImage) {
      const eventReference = doc(db, "events", idDocument);
      updateDoc(eventReference, {
        title,
        type,
        details,
        date,
        time,
        photo: newImage ? newImage?.name: currentImage?.name
      });

      await uploadBytes(storageReference, await fileToBlob(newImage));

    }else {
      const eventReference = doc(db, "events", idDocument);
      updateDoc(eventReference, {
        title,
        type,
        details,
        date,
        time
      });
    }

    setTimeout(() => {
      setLoading(false);
      toast('Evento atualizado!',
        {
            position: "top-center",
            style: {
            borderRadius: '10px',
            background: '#fff',
            color: '#333',
            },
        }
      );
    }, 1500);
  };

  return(
    <>
      <Navbar />

      <ToastContainer />

      <div className="col-12 content">
        <div className="row">
          <h3 className="mx-auto font-weight-bold mt-2">
          {match.params.id ? "Atualizar evento" : "Publicar evento"}
          </h3>
        </div>

        <form>
          <div className="form-group">
            <label>Título:</label>
            <input 
              type="text" 
              className="form-control" 
              onChange={ e => setTitle(e.target.value) }
              value={title} />
          </div>

          <div className="form-group">
            <label>Tipo:</label>
            <select className="form-control" onChange={ e => setType(e.target.value) } value={type}>
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
              onChange={ e => setDetails(e.target.value) }
              value={details}>
            </textarea>
          </div>

          <div className="form-group row">
            <div className="col-6">
              <label>Data:</label>
              <input 
                type="date" 
                className="form-control"
                onChange={ e => setDate(e.target.value) } 
                value={date} />
            </div>

            <div className="col-6">
              <label>Hora:</label>
              <input 
                type="time" 
                className="form-control"
                onChange={ e => setTime(e.target.value) }
                value={time} />
            </div>
          </div>

          <div className="form-group">
            <label>Upload da foto: {match.params.id && '(caso queira manter a mesma imagem, não precisa escolher uma nova)'}</label>
            <input 
              type="file" 
              className="form-control"
              onChange={ e => setNewImage(e.target.files?.[0]) } />
          </div>

          {!loading && (
            <button 
              onClick={ match.params.id ? updateEvent : registerEvent }
              className="w-100 btn btn-lg btn-publish mt-3 mb-2" 
              type="button"
            >
              {match.params.id ? "Atualizar" : "Publicar"}
            </button>
          )}
          
          {loading && (
            <button className="w-100 btn btn-lg btn-publish mt-3 mb-2" type="button" disabled>
              <span className="spinner-border spinner-border-sm mr-2 m-1 h6" role="status" aria-hidden="true"></span>
              {match.params.id ? "Atualizando..." : "Publicando..."}
            </button>
          )}
        </form>
      </div>
    </>
  );
};