
"use client";
import { eventNames } from "process";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { styles } from "./style";
import {
  FaCalendarAlt,
  FaClock,
  FaPlus,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { format } from "path";
import { set } from "lodash";

const Calendar = () => {
  const { data: session } = useSession();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [displayedMonth, setDisplayedMonth] = useState(currentDate.getMonth());
  const [displayedYear, setDisplayedYear] = useState(currentDate.getFullYear());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    eventname: "",
    date: "",
    time: "",
    category: "Formal",
    location: "",
    description: "",
    image: null,
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/events/${session?.user.cid}`);
        const data = await response.json();
        const formattedEvents = data.map((event) => ({
          id: event.eid.trim(),
          eventname: event.ename,
          date: new Date(event.edate).toISOString().slice(0, 10), // Format to YYYY-MM-DD
          time: new Date(event.edate).toISOString().slice(11, 16), // Format to HH:MM
          category: event.edresscode, 
          location: event.evenue,
          description: event.edescription,
          image: null,
        }));
        setEvents(formattedEvents);
        console.log(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const daysInMonth = new Date(displayedYear, displayedMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(displayedYear, displayedMonth, 1).getDay();

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++)
      days.push(<div key={`empty-${i}`} style={styles.dayCell}></div>);

    for (let i = 1; i <= daysInMonth; i++) {
      const dayEvents = events.filter(
        (event) =>
          new Date(event.date).getDate() === i &&
          new Date(event.date).getMonth() === displayedMonth &&
          new Date(event.date).getFullYear() === displayedYear
      );

      days.push(
        <div
          key={i}
          style={{
            ...styles.dayCell,
            ...(i === currentDate.getDate() &&
            displayedMonth === currentDate.getMonth() &&
            displayedYear === currentDate.getFullYear()
              ? styles.currentDay
              : {}),
          }}
          onClick={() => {
            if (dayEvents.length === 0) {
              setNewEvent({
                ...newEvent,
                date: `${displayedYear}-${String(displayedMonth + 1).padStart(
                  2,
                  "0"
                )}-${String(i).padStart(2, "0")}`,
              });
              setShowAddEvent(true);
              setEditingEvent(null);
            } else {
              setSelectedEvent(dayEvents[0]);
              setEditingEvent(null);
              setShowAddEvent(false);
            }
          }}
        >
          <span style={styles.dayNumber}>{i}</span>
          {dayEvents.map((event) => (
            <div
              key={event.id}
              style={{ ...styles.event, ...getCategoryColor(event.category) }}
              onClick={() => handleEditEvent(event)}
            >
              <p>{event.eventname}</p>
            </div>
          ))}
        </div>
      );
    }
    return days;
  };

  const handleDateClick = (date, isDateEmpty) => {
    if (isDateEmpty) {
      setEditingEvent(null); // Reset to add a new event
      setNewEvent({ ...newEvent, date });
      setShowAddEvent(true);
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Formal":
        return styles.workCategory;
      case "Casual":
        return styles.personalCategory;
      default:
        return styles.defaultCategory;
    }
  };

  const getCountdown = (eventDate, eventTime) => {
    const now = new Date();
    const eventDateTime = new Date(`${eventDate}T${eventTime}`);
    const diff = eventDateTime - now;
    if (diff < 0) return "Event passed";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${days}d ${hours}h ${minutes}m`;
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();

    if (editingEvent) {
      try {
        setEvents(
          events.map((event) =>
            event.id === editingEvent.id ? { ...event, ...newEvent } : event
          )
        );
        setEditingEvent(null);
        setShowAddEvent(false);

        const neventData = {
          eName: newEvent.eventname,
          eDate: `${newEvent.date}T${newEvent.time}:00Z`,
          eVenue: newEvent.location,
          eDescription: newEvent.description,
          eDresscode: newEvent.category,
          cid: session?.user.cid,
        };

        const response = await fetch(`/api/events/${editingEvent.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(neventData),
        });

        if (response.ok) {
          console.log('Event updated successfully');
          setSnackbarMessage("Event updated successfully");
        } else {
          console.error('Failed to update event');
        }

        setShowAddEvent(false);
      } catch (error) {
        console.error('Error updating event:', error);
      }
    } else {
      try {
        const result = await fetch(`/api/getEventID/${session.user.cid}`);
        const { latestEventId } = await result.json();
        const lastIdNumber = parseInt(latestEventId.slice(1), 10);
        const newEventId = `E${String(lastIdNumber + 1).padStart(2, '0')}`;

        const eventData = {
          eId: newEventId,
          eName: newEvent.eventname,
          eDate: `${newEvent.date}T${newEvent.time}:00Z`,
          eVenue: newEvent.location,
          eDescription: newEvent.description,
          eDresscode: newEvent.category,
          cid: session?.user.cid,
        };

        const response = await fetch(`/api/events/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        });

        if (response.ok) {
          const savedEvent = await response.json();
          setEvents([...events, savedEvent]); // Update local events with the saved event

          setSnackbarMessage("Event added successfully");
        } else {
          console.error('Failed to add event');
          alert('Failed to add Event');
        }
        setShowAddEvent(false);
      } catch (error) {
        console.error('Error adding event:', error);
      }
    }

    setNewEvent({
      eventname: '',
      date: '',
      time: '',
      category: 'Formal',
      location: '',
      description: '',
      image: null,
    });
  };

  const handleDeleteEvent = async (eventId) => {
    setEventToDelete(eventId);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteEvent = async () => {
    try {
      const response = await fetch(`/api/events/${eventToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEvents(events.filter((event) => event.id !== eventToDelete));
        setSnackbarMessage("Event deleted successfully");
      } else {
        console.error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setEventToDelete(null);
  };

  return (
    <div style={styles.container}>
      {/* Snackbar Message */}
      {snackbarMessage && (
        <div style={styles.snackbar}>
          <p>{snackbarMessage}</p>
        </div>
      )}

      {/* Event List */}
      <div style={styles.eventsList}>
        {events.map((event) => (
          <div key={event.id} style={styles.eventCard}>
            <h3>{event.eventname}</h3>
            <div>{event.date}</div>
            <div>{event.time}</div>
            <div>{event.location}</div>
            <div>{event.description}</div>
            <button onClick={() => setEditingEvent(event)}>Edit</button>
            <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Are you sure you want to delete this event?</h3>
            <div style={styles.modalActions}>
              <button onClick={confirmDeleteEvent}>Yes</button>
              <button onClick={handleCancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Form */}
      {showAddEvent && (
        <div style={styles.addEventForm}>
          <h3>{editingEvent ? "Edit Event" : "Add Event"}</h3>
          <form onSubmit={handleAddEvent}>
            <input
              type="text"
              value={newEvent.eventname}
              onChange={(e) =>
                setNewEvent({ ...newEvent, eventname: e.target.value })
              }
              placeholder="Event Name"
              required
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
              required
            />
            <input
              type="time"
              value={newEvent.time}
              onChange={(e) =>
                setNewEvent({ ...newEvent, time: e.target.value })
              }
              required
            />
            <select
              value={newEvent.category}
              onChange={(e) =>
                setNewEvent({ ...newEvent, category: e.target.value })
              }
            >
              <option value="Formal">Formal</option>
              <option value="Casual">Casual</option>
            </select>
            <input
              type="text"
              value={newEvent.location}
              onChange={(e) =>
                setNewEvent({ ...newEvent, location: e.target.value })
              }
              placeholder="Location"
              required
            />
            <textarea
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              placeholder="Description"
            />
            <button type="submit">
              {editingEvent ? "Update Event" : "Add Event"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Calendar;
