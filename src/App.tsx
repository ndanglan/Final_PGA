import React from 'react';
import './App.css';
import { Routes } from './Routes';
import { useSelector } from 'react-redux';
import { AppState } from './redux/reducer';
import SpinnerLoading from './modules/common/components/Loading/SpinnerLoading';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


function App() {
  const loading = useSelector((state: AppState) => state.loading.isLoading);

  return (
    <>
      {loading && <SpinnerLoading />}
      <Routes />
    </>

  );
}

export default App;
