import React, {useEffect, useState} from 'react'
import logo from '../logo.svg';
import axios from 'axios';
import useSound from 'use-sound';
import boopS from '/public/pop.mp3';





function User() {
  const [user, setUser] = useState(null)
  const [playBoop] = useSound(boopS);

  
  const getUser = async () =>{
    const data = await axios.get('api/getUser')
    setUser(data.data)
  }

  useEffect(() => {getUser()}, [])
  // function initMap() {
  //   map = new google.maps.Map(document.getElementById("App"), {
  //     center: {lat: 31.249739085, lng:  34.7992617},
  //     zoom: 16,
  //   });
  
  return (
    <div className="App">
      <header className="App-header">
        {/* Async script executes immediately and must be after any DOM elements used in callback. */}
      {/* <script
      src= 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCWufpfrFns40pvzf1d2itHGbyM3OX9NIU&callback=initMap&libraries=&v=weekly'
      async
    ></script> */}
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {`Hello ${user}`}
        </p>
        <button onClick={playBoop}>Play</button>;
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          the ruler!!
        </a>
      </header>
    </div>
  );
}

export default User;
