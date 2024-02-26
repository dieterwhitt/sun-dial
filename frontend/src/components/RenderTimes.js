// dieter whittingham
// rendering times component

import { useState, useEffect } from 'react';

export function RenderTimes() {
  // setting default location of toronto
  const [cityName, setCityName] = useState('Toronto, Canada');
  // toronto's coordinates
  const [coords, setCoords] = useState([43.6532, -79.3832]);
  // toronto's utc offset, time, and timezone
  const [offset, setOffset] = useState(300);
  const [time, setTime] = useState(0);
  const [timezone, setTimezone] = useState('Eastern Standard Time');
  const [sunData, setSunData] = useState({});

  //useEffect which attempts to get the user's location once upon initial render
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
      console.log(`lat/long: ${localCoords}`);
      // update coordinates
      setCoords(localCoords);
      // useeffect will update city name, update offset
    }
    // if error
    function error() {
      console.log('Unable to retrieve your location');
      // set defualt coords
      setCoords([43.6532, -79.3832]);
    }
  }, []);

  // useffect which updates the current city/country name
  // based on when coordinates change
  // uses the bigdatacloud api
  useEffect(() => {
    // get api response
    const url = 'https://api.bigdatacloud.net/data/reverse-geocode-client?';
    const location = `latitude=${coords[0]}&longitude=${coords[1]}`;
    // fetching json
    console.log('attempting to fetch from ' + url + location);
    fetch(url + location)
      .then(response => {
        if (!response.ok) {
          throw new Error('network response was not ok');
        }
        // parse the json in the response
        return response.json();
      })
      .then(data => {
        console.log(data);
        // update city name
        const newCity = `${data.city}, 
        ${data.countryName}`;

        setCityName(newCity);
      })
      .catch(error => {
        console.error('error trying to fetch: ', error);
      });
  }, [coords]);

  // useeffect which updates the offset, sunrise, and sunset time when
  // coordinates change
  // uses the sunrisesunset.io api
  useEffect(() => {
    // get api response
    const url = 'https://api.sunrisesunset.io/json?';
    const location = `lat=${coords[0]}&lng=${coords[1]}`;
    // fetching json
    console.log('attempting to fetch from ' + url + location);
    fetch(url + location)
      .then(response => {
        if (!response.ok) {
          throw new Error('network response was not ok');
        }
        // parse the json in the response
        return response.json();
      })
      .then(data => {
        console.log(data);
        // attempt to access json fields
        // update offset and sunrise/sunset times
        const newOffset = -1 * data.results.utc_offset;
        const newSunData = {
          sunrise: data.results.sunrise,
          sunset: data.results.sunset,
          firstLight: data.results.first_light,
          lastLight: data.results.last_light,
          dayLength: data.results.day_length
        };
        console.log(newOffset);
        console.log(newSunData);
        // setting
        setOffset(newOffset);
        setSunData(newSunData);
      })
      .catch(error => {
        console.error('error trying to fetch: ', error);
      });
  }, [coords]);

  // function that updates the selected time and timezone based on the 
  // desired utc offset
  function updateTime() {
    // first create local time object
    const targetTime = new Date();
    const localOffset = targetTime.getTimezoneOffset();
    // update target time
    // subtract local utc offset and add target utc offset
    targetTime.setTime(targetTime.getTime() + (offset * 60 * 1000)
      - (localOffset * 60 * 1000));
    //updating
    setTimezone(targetTime.toString().match(/\(([^\)]+)\)$/)[1]);
    setTime(targetTime.toLocaleString());
  }

  // useEffect which updates the time every second 
  useEffect(() => {
    setTimeout(() => {
      updateTime();
    }, 1000);
  });

  return (
    <div>Current time in {cityName}:
      <br />
      {offset} {time} {timezone}
      <br />lat: {coords[0]} long: {coords[1]}
      <br />sun data: {Object.values(sunData)}
    </div>
  );
}
