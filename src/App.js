import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import Modal from "./components/Modal";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons



const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});


const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2022, 7, 0),
    end: new Date(2022, 7, 0),
  },
  {
    title: "Vacation",
    start: new Date(2022, 7, 7),
    end: new Date(2022, 7, 10),
  },
  {
    title: "Conference",
    start: new Date(2022, 7, 20),
    end: new Date(2022, 7, 23),
  },
];
function App() {

  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [e, setE] = useState();

  const [startDay, setStartDay] = useState(new Date(1900, 1, 1));
  const [endDay, setEndDay] = useState(new Date(2100, 1, 2));

  function handleAddEvent() {
    if (startDay <= endDay) {

      setAllEvents([...allEvents, newEvent])
      events.push(newEvent);
      console.log("events:", events);
    }
    else {
      alert("Start of the event must be before the end!");
    }

  }

  function handleDoubleClick() {

    console.log("double clicked!");
    console.log("while deleting", e.title);

    const remove = window.confirm("Would you like to remove this event?")

    if (remove) {

      setAllEvents(events, removeByAttr(events, 'title', e.title));

      console.log(e.title, "Event data");

    }

  }

  function removeByAttr(arr, attr, value) {
    var i = arr.length;
    while (i--) {
      if (arr[i]
        && arr[i].hasOwnProperty(attr)
        && (arguments.length > 2 && arr[i][attr] === value)) {

        arr.splice(i, 1);
      }
    }

    console.log(arr);
    return arr;
  }

  function header() {

    return (
      <div style={{ marginLeft: "10px" }}>
        {e?.title}
      </div>)
  }

  function handleEdit() {

    setIsEditModalOpen(true);
  }

  return (
    <div className="App">
      <h1>Signum Calendar</h1>
      <h3>Add New Event</h3>

      <Dialog visible={modalOpen} onHide={() => setModalOpen(false)} header={header} style={{ width: "40%", height: "30%" }}>

        <button
          style={{ width: "80%", height: "30%", margin: "10px", backgroundColor: "#acdaa6", borderWidth: 0, borderRadius: 10 }}
          onClick={() => {
            setIsEditModalOpen(true);
            handleEdit();
          }}>
          Edit
        </button>
        <button
          style={{ width: "80%", height: "30%", margin: "10px", backgroundColor: "#db837b", borderWidth: 0, borderRadius: 10 }}
          onClick={handleDoubleClick}>
          Delete
        </button>

      </Dialog>

      <Dialog visible={isEditModalOpen} onHide={() => setIsEditModalOpen(false)} header={header} style={{ width: "70%", height: "50%" }}>
        <input type="text" placeholder="Edit Title" style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />

        <DatePicker

          placeholderText="Start Date"
          onCalendarClose={
            () => {
              setStartDay(newEvent.start);

            }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start }) /*setNewEvent({...newEvent, start: start})*/}
          portalId="root-portal"
          popperPlacement="bottom"
          popperClassName="date-picker-reports"

        />

        <DatePicker
          placeholderText="End Date"
          onCalendarClose={
            () => {
              setEndDay(newEvent.end);
            }
          }
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end }) /*setNewEvent({...newEvent, start: start})*/}
          portalId="root-portal"
          popperPlacement="bottom"
          popperClassName="date-picker-reports"
          
        />
        <button style={{ marginTop: "10px" }} onClick={handleAddEvent} >Add</button>


      </Dialog> 

      <div>
        <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />

        <DatePicker

          placeholderText="Start Date"
          onCalendarClose={
            () => {
              setStartDay(newEvent.start);

            }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start }) /*setNewEvent({...newEvent, start: start})*/}
          portalId="root-portal"
          popperPlacement="bottom"
          popperClassName="date-picker-reports"

        />

        <DatePicker
          placeholderText="End Date"
          onCalendarClose={
            () => {
              setEndDay(newEvent.end);
            }
          }
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end }) /*setNewEvent({...newEvent, start: start})*/}
          portalId="root-portal"
          popperPlacement="bottom"
          popperClassName="date-picker-reports"
        />
        <button style={{ marginTop: "10px" }} onClick={handleAddEvent} >Add</button>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        onSelectEvent={(e) => { setModalOpen(!modalOpen); console.log("onSelect event", e.target); setE(e); }}
      />
    </div>
  );
}

export default App;
