import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { Skeleton } from '../Skeleton';

import './styles.scss';

type EventCardProps = {
  id: String;
  imageName: String;
  title: String;
  details: String;
  views: Number;
};

export default function EventCard({ id, imageName, title, details, views }:EventCardProps): JSX.Element {
  const [urlImage, setUrlImage] = useState('');
  const [urlLoaded, setUrlLoaded] = useState(false);
  
  const firebaseApp = getApp();
  const storage = getStorage(firebaseApp, "gs://events-app-704a6.appspot.com");

  useEffect(() => {
    (async () => {
      const url = await getDownloadURL(ref(storage, `images/${imageName}`));
      setUrlImage(url);
      setUrlLoaded(true);
    })();
  }, []);

  return(
    <div className="col-md-3 col-sm-12">
      {urlLoaded ? (
        <img src={ urlImage } className="card-img-top img-card" alt="Imagem do Evento" />
      ) : (
        <Skeleton width="300px" height="200px" />
      )
      }

      <div className="card-body">
        <h5>{ title }</h5>
        <p className="card-text text-justify">{ details }</p>

        <div className="row footer-card d-flex align-items-center">
          <div className="col-6">
            <Link to={`/event_details/${id}`} className="btn btn-sm btn-details">+ detalhes</Link>
          </div>

          <div className="col-6 text-right">
            <i className="fas fa-eye"></i><span className="pl-2">{ views }</span>
          </div>
        </div>
      </div>
    </div>
  );
};