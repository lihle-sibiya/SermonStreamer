import React from 'react';

const EventCard = ({ event }) => {
  const imageUrl = `https://arthurfrost.qflo.co.za/Images/${event.image}`;
  const audioUrl = `https://arthurfrost.qflo.co.za/MP3/${event.audio}`;

  //Duration field in seconds
  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <div className="event-card border-2 border-gray-500 rounded-lg m-4 p-4 relative hover:shadow-xl">
      <h2 className="text-lg font-bold">{event.title}</h2>
      <p className="text-gray-500">{event.description}</p>
      <img
        src={imageUrl}
        alt={event.title}
        className="w-full h-48 object-cover rounded-lg my-2"
        onError={(e) => { e.target.src = 'placeholder.png'; }} //Placeholder image incase there is an error
      />
      <audio controls>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <p className="mt-2 text-gray-600">Duration: {formatDuration(event.duration)}</p> {/* Display audio duration */}
    </div>
  );
};

export default EventCard;


