import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddEditEventForm from "./Addevent";
import axios from "axios";

const App = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [view, setView] = useState("dayGridMonth");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/");
        const data = await response.json();
        console.log("Data ", data);
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventDrop = ({ event, delta, revert }) => {
    const updatedEvent = {
      ...event,
      start: event.start.toISOString(),
      end: event.end.toISOString(),
    };

    const updatedEvents = events.map((item) =>
      item.id === updatedEvent.id ? updatedEvent : item
    );
    setEvents(updatedEvents);
    console.log(updatedEvent);
    axios
      .put(`http://127.0.0.1:8000/event/${updatedEvent._id}`, updatedEvent)
      .then((data) => console.log("Updated"))
      .catch((err) => console.log(err));
    // If there is an error updating the event, revert the changes in the calendar
    revert();
  };

  const handleEventClick = ({ event }) => {
    console.log(event);
    setSelectedEvent(event);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleEventDelete = (eventToDelete) => {
    const updatedEvents = events.filter(
      (event) => event.id !== eventToDelete.id
    );
    setEvents(updatedEvents);

    console.log(eventToDelete);
    axios
      .delete(`http://127.0.0.1:8000/event/${eventToDelete._id}`)
      .then((data) => console.log("Updated"))
      .catch((err) => console.log(err));
    setSelectedEvent(null); // Deselect the event if it was deleted
  };

  const handleAddEditFormSubmit = (eventData) => {
    if (selectedEvent) {
      const updatedEvent = {
        ...selectedEvent,
        ...eventData,
      };
      const updatedEvents = events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      );
      setEvents(updatedEvents);

      console.log(updatedEvent);
      axios
        .put(`http://127.0.0.1:8000/event/${updatedEvent._id}`, updatedEvent)
        .then((data) => console.log("Updated"))
        .catch((err) => console.log(err));
    } else {
      const newEvent = {
        id: Date.now().toString(),
        ...eventData,
      };
      setEvents([...events, newEvent]);
      axios
        .post(`http://127.0.0.1:8000/create-event`, newEvent)
        .then((data) => console.log("Added"))
        .catch((err) => console.log(err));
    }

    setSelectedEvent(null);
  };

  return (
    <div className="App">
      <h1>Event Calendar</h1>
      <div className="calendar-controls">
        <button onClick={() => handleViewChange("dayGridMonth")}>
          Month View
        </button>
        <button onClick={() => handleViewChange("timeGridWeek")}>
          Week View
        </button>
        <button onClick={() => handleViewChange("timeGridDay")}>
          Day View
        </button>
      </div>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={view}
          events={events}
          editable={true}
          droppable={true}
          eventDrop={handleEventDrop}
          eventClick={handleEventClick}
        />
      </div>
      {selectedEvent && (
        <div className="event-details">
          <h2>Event Details</h2>
          <p>Title: {selectedEvent.title}</p>
          <p>Start: {selectedEvent.start.toLocaleString()}</p>
          <p>End: {selectedEvent.end.toLocaleString()}</p>
          <button onClick={() => handleEventDelete(selectedEvent)}>
            Delete Event
          </button>
        </div>
      )}
      <AddEditEventForm
        event={selectedEvent}
        onSubmit={handleAddEditFormSubmit}
      />
    </div>
  );
};

export default App;
