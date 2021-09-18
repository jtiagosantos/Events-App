import { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { RootStateOrAny, useSelector } from 'react-redux';

import { collection, query, getDocs, getFirestore, where, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

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
  photo: string
  public: number,
  createdAt: Date
};

export default function EventDetails({ match }:any): JSX.Element {
  const [event, setEvent] = useState<eventProps | any>();
  const [urlImage, setUrlImage] = useState('');
  const [idDocument, setIdDocument] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const loggedUser = useSelector((state: RootStateOrAny) => state.userEmail);

  const db = getFirestore();
  const firebaseApp = getApp();
  const storage = getStorage(firebaseApp, "gs://events-app-704a6.appspot.com");

  useEffect(() => {
    (async () => {
      const data = await getDocs(query(collection(db, "events"), where("id", "==", match.params.id)));
      data.forEach(document => {
        setEvent(document.data());
        setIdDocument(document.id);
      });

      if(idDocument) {
        const eventReference = doc(db, "events", idDocument);
        updateDoc(eventReference, {
          views: event.views + 1
        });
      }

      if(event?.photo) {
        const url = await getDownloadURL(ref(storage, `images/${event.photo}`));
        setUrlImage(url);
        setLoading(false);
      }
    })();
  }, [idDocument]);  

  async function deleteEvent() {
    const eventReference = doc(db, "events", idDocument);
    await deleteDoc(eventReference);
    toast('Evento removido!',
      {
          position: "top-center",
          style: {
          borderRadius: '10px',
          background: '#fff',
          color: '#333',
          },
      }
    );
    setTimeout(() => setDeleted(true), 2000);
  };
  
  return(
    <>
      <Navbar />

      <ToastContainer />

      <div className="container-fluid">
        {loading ? (
          <div className="loading">
            <div className="spinner-border mx-auto" role="status">
            </div>
          </div>
        )
        :
        <>
          <div className="row">
            <img src={ urlImage } className="img-card-details" alt={ event?.title } />
            <div className="col-12 text-right mt-2 views">
              <i className="fas fa-eye"></i><span className="pl-2">{ event?.views + 1 }</span>
            </div>
            <h2 className="mx-auto mt-4"><strong>{ event?.title }</strong></h2>
          </div>

          <div className="row mt-5 d-flex justify-content-around">
            <div className="col-md-3 col-sm-12 box-info p-3 my-2">
              <i className="fas fa-ticket-alt fa-2x"></i>
              <h5><strong>Tipo</strong></h5>
              <span className="mt-3">{ event?.type }</span>
            </div>

            <div className="col-md-3 col-sm-12 box-info p-3 my-2">
              <i className="fas fa-calendar-alt fa-2x"></i>
              <h5><strong>Data</strong></h5>
              <span className="mt-3">{ event?.date }</span>
            </div>
            
            <div className="col-md-3 col-sm-12 box-info p-3 my-2">
              <i className="fas fa-clock fa-2x"></i>
              <h5><strong>Hora</strong></h5>
              <span className="mt-3">{ event?.time }</span>
            </div>
          </div>

          <div className="d-flex flex-column box-details mt-5">
            <h5 className="mx-auto"><strong>Detalhes do Evento</strong></h5>
            <p className="mx-auto p-1">{ event?.details }</p>
          </div>

          {loggedUser === event?.user && (
            <>
              <Link to={`/edit_event/${match.params.id}`} className="btn-edit btn-action">
                <i className="fas fa-pen-square fa-3x"></i>
              </Link>
              <Link to="#" onClick={ deleteEvent } className="btn-delete btn-action">
                <i className="fas fa-minus-square fa-3x"></i>
              </Link>
            </>
          )}
        </>
        }
      </div>

      {deleted ? <Redirect to="/" /> : null}
    </>
  );
};