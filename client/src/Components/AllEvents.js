import React, { useEffect, useState } from "react";
import axios from "axios";

function AllEvents() {
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/").then((data) => {
      console.log(data);
      setAllEvents(data.data);
    });
  }, []);

  return (
    <>
      {allEvents.map((d) => (
        <li key={d._id}>{d.event_title}</li>
      ))}
    </>
  );
}

export default AllEvents;
