import React from 'react';
// import {
//   BrowserRouter as Router,
//    Redirect,Navigate
// } from "react-router-dom";
import './App.css';
import Row from './Row';
import requests from './requests';
import Banner from './Banner';
import Nav from './Nav';
import Home from './Home';

const App = () => {

  return (
    <>
      <div className='app'>
        <Nav />

        {/* <Routes>
      <Route path="/" element={<Home />} /> */}
    {/* </Routes> */}

        <Banner />
        <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchWestern} isLargeRow={true} rowId={1} />
        <Row title="Trending Now" fetchUrl={requests.fetchTrending} rowId={2} />
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated} rowId={3} />
        <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} rowId={4} />
        <Row title="Comedy/Movies" fetchUrl={requests.fetchComedyMovies} rowId={5} />
        <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} rowId={6} />
        <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} rowId={7} />
        <Row title="Animes" fetchUrl={requests.fetchAnimation} rowId={8} />

      </div>
    </>
  );
}

export default App;