import { createRoot } from 'react-dom/client';
import React from 'react';
import PatientScheduler from './PatientScheduler.jsx';
import './styles.css';

const root = createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <PatientScheduler />
  </React.StrictMode>
);