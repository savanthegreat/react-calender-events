import Calendar from "./Components/Calender";
import "./App.css";
// import AllEvents from "./Components/AllEvents";
// import Popup from "./Components/Popup";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Calendar />
      </DndProvider>
      {/* <AllEvents /> */}
      {/* <Popup /> */}
    </>
  );
}

export default App;
