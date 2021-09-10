import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import EventCard from '../../components/EventCard';

import { collection, query, getDocs, getFirestore } from "firebase/firestore";

import './styles.scss';

export default function Home(): JSX.Element {
  const [events, setEvents] = useState<any[]>();

  const eventsList:any = [];
  const db = getFirestore();

  useEffect(() => {
    (async () => {
      const data = await getDocs(query(collection(db, "events")));

      data.forEach(document => {
        eventsList.push(document.data());
      });

      setEvents(eventsList);
    })();
  }, [db]);

  return(
    <>
      <Navbar />
      
      <div className="row p-2 mx-auto pt-4">
        { events?.map(event => {
          return <EventCard 
                    key={event.createdAt} 
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