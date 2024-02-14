// dieter whittingham
// react frontend
// single webpage

import { useState, useEffect } from 'react';

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

  // function that updates the selected time and timezone based on a 
  // desired utc offset
  function updateTime(targetOffset){
    // first create local time object
    const targetTime = new Date();
    const localOffset = targetTime.getTimezoneOffset();
    // update target time
    // subtract local offset and add target offset
    targetTime.setTime(targetTime.getTime() + (targetOffset * 60 * 1000)
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
      {offset} {time} {timezone}</div>
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
