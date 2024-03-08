// dieter whttingham
// subscription form component

import { useState, useEffect } from 'react';

export function SubscriptionForm(props) {
    // props: city, location
    const [location, setLocation] = useState(props.location);
    const [city, setCity] = useState(props.city);
    const [search, setSearch] = useState([]);

    // updates state if new props are given
    useEffect(() => {
        setLocation(props.location);
        setCity(props.city);
    }, [props]);

    // search bar which updates whenever its content changes
    // clicking a search result should set those coords and city name
    return (
        <div>
            <div>Subscribe:</div>
            <div>{city}</div>
        </div>
        
    );
}
