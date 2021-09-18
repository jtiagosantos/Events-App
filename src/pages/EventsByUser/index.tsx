import { useState, useEffect } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';

import Navbar from '../../components/Navbar';
import EventCard from '../../components/EventCard';

import { collection, query, getDocs, getFirestore, where } from "firebase/firestore";

import './styles.scss';

export default function EventsByUser(): JSX.Element {
  const [events, setEvents] = useState<any[]>();
  const [search, setSearch] = useState('');

  const eventsList:any = [];
  const db = getFirestore();
  const userEmail = useSelector((state: RootStateOrAny) => state.userEmail);

  async function searchEvents(search: String) {
    const data = await getDocs(query(collection(db, "events"), where("user", "==", userEmail)));

    data.forEach(document => {
      if(document.data().title.indexOf(search) >= 0) {
        eventsList.push({
          id: document.id,
          ...document.data()
        });
      }
    });

    setEvents(eventsList);
  };

  function handleKeyPress(e:any) {
    if(e.key === 'Enter') {
      searchEvents(search);
    }
  };

  useEffect(() => {
    searchEvents(search);
  }, []);

  return(
    <>
      <Navbar />

      <div className="p-4 mx-auto top-container">
        <div>
          <h3>Eventos publicados</h3>
        </div>
        <div className="input-group d-flex justify-content-end">
          <input 
            onChange={ e => setSearch(e.target.value) } 
            onKeyPress={ handleKeyPress } 
            value={ search } 
            type="text" 
            className="form-control col-3 input-search" 
            placeholder="Pesquisar evento"
          />
          <div className="input-group-append">
            <button 
              type="button"
              className="btn btn-outline-secondary btn-search" 
              onClick={ () => searchEvents(search) } 
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    
      <div className="row p-2 mx-auto">
        { events?.map(event => {
          return <EventCard 
                    key={event.id} 
                    id={event.id}
                    imageName={event.photo} 
                    title={event.title}
                    details={event.details}
                    views={event.views}
                  />;
        }) }
      </div>
    </>
  );
};