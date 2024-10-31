import React, { useEffect, useState } from 'react';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const baseUrl = 'https://arthurfrost.qflo.co.za/'; // Base URL for images

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://arthurfrost.qflo.co.za/php/getTimeline.php');
        const data = await response.json();
        console.log(data); // Log the response to check its structure

        // Check if Timeline is an array and set the state accordingly
        if (Array.isArray(data.Timeline)) {
          setEvents(data.Timeline);
        } else {
          console.error("Expected Timeline to be an array:", data.Timeline);
          setEvents([]); // Set events to an empty array to avoid map error
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleError = (e) => {
    e.target.src = `${baseUrl}Images/placeholder.jpg`; // Set a placeholder image if the original fails
  };

  return (
    <div>
      <h1>Sermon List</h1>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <h2>{event.Title}</h2>
            <p>Episode: {event.Episode}</p>
            {/* Constructing the full image URL with error handling */}
            <img 
              src={`${baseUrl}${event.Image}`} 
              alt={event.Title} 
              onError={handleError} // Error handling
              style={{ maxWidth: '100%', height: 'auto' }} 
            />
            <audio controls>
              <source src={`${baseUrl}${event.Audio}`} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;