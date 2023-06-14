import React, { useState } from "react";

const AddEditEventForm = ({ event, onSubmit }) => {
  const [title, setTitle] = useState(event ? event.title : "");
  const [startDate, setStartDate] = useState(event ? event.start : "");
  const [startTime, setStartTime] = useState(event ? event.start : "");
  const [endDate, setEndDate] = useState(event ? event.end : "");
  const [endTime, setEndTime] = useState(event ? event.end : "");
  const [description, setDescription] = useState(
    event ? event.description : ""
  );
  const [priority, setPriority] = useState(event ? event.priority : "High");

  const handleSubmit = (e) => {
    e.preventDefault();

    const eventData = {
      title,
      start: new Date(`${startDate} ${startTime}`).toISOString(),
      end: new Date(`${endDate} ${endTime}`).toISOString(),
      description,
      priority: priority,
    };
    onSubmit(eventData);

    // Reset form inputs
    setTitle("");
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
    setDescription("");
    setPriority("");
  };

  return (
    <div className="event-form">
      <h2>{event ? "Edit Event" : "Add Event"}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <label htmlFor="startTime">Start Time:</label>
        <input
          type="time"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />

        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        <label htmlFor="endTime">End Time:</label>
        <input
          type="time"
          id="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="priority">Priority:</label>

        <select
          name="priority"
          id="priority"
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button type="submit">{event ? "Save Changes" : "Add Event"}</button>
      </form>
    </div>
  );
};

export default AddEditEventForm;
