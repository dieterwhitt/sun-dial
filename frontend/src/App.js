// dieter whittingham
// react frontend
// single webpage

import { useState, useEffect } from 'react';
//import { use } from '../../backend/routes/subscribers';

function Header(){
  return;
}

function RenderTimes(){
  // setting default location of toronto
  const [cityName, setCityName] = useState('Toronto, Canada');
  // toronto's coordinates
  const [coords, setCoords] = useState([45.6532,79.3832]);
  // toronto's utc offset, time, and timezone
  const [offset, setOffset] = useState(300);
  const [time, setTime] = useState(0);
  const [timezone, setTimezone] = useState('');

  //useEffect which gets the user's location once upon initial render
  useEffect(() => { 
    // try to get user's coordinates
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log('geolocation not supported');
    }
    // if success
    function success(position) {
      const localCoords = [position.coords.latitude, position.coords.longitude];
      console.log(`lat/long: ${coords}`);
      // update coordinates
      setCoords(localCoords);
      // update city name, update offset
    }
    // if error
    function error() {
      console.log('Unable to retrieve your location');
    }
  }, []);

  // function which updates the current city/country name and offset
  // based on coordinates
  function updateCity(){

  }

  // function that updates the selected time and timezone based on the 
  // desired utc offset
  function updateTime(){
    // first create local time object
    const targetTime = new Date();
    const localOffset = targetTime.getTimezoneOffset();
    // update target time
    // subtract local offset and add target offset
    targetTime.setTime(targetTime.getTime() + (offset * 60 * 1000)
      - (localOffset * 60 * 1000));
    //updating
    setTimezone(targetTime.toString().match(/\(([^\)]+)\)$/)[1]);
    setTime(targetTime.toLocaleString());
  }
  
  //useEffect which updates the time every second
  useEffect(() => {
    setTimeout(() => {
      updateTime(offset);
    }, 1000);
  });

  return(
    <div>Current time in {cityName}:
      <br/>
      {offset} {time} {timezone}
      <br/>lat: {coords[0]} long: {coords[1]}
      </div>
  )

  
}

function SubscriptionForm(){

}

function Footer(){
  return(
    <p>Created by Dieter Whittingham
      <br/>Powered by
    </p>
  );
}

function App() {
  return (
    <div className="App">
      <Header/>
      <RenderTimes/>
      <SubscriptionForm/>
      <Footer/>
    </div>
  );
}

export default App;
