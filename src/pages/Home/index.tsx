import { useState } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import EventCard from '../../components/EventCard';

import './styles.scss';

export default function Home(): JSX.Element {
  return(
    <>
      <Navbar />
      
      <div className="row p-2 mx-auto">
        <EventCard />
      </div>
    </>
  );
};