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
import { Alert, Box, Snackbar } from "@mui/material";
import LinearWithValueLabel from "../loading";

const Calendar = () => {
  const {data: session} = useSession();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [displayedMonth, setDisplayedMonth] = useState(currentDate.getMonth());
  const [displayedYear, setDisplayedYear] = useState(currentDate.getFullYear());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newEvent, setNewEvent] = useState({
    eventname: "",
    date: "",
    time: "",
    category: "Formal",
    location: "",
    description: "",
    image: "",
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");


  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/events/${session?.user.cid}`); // Update this to your actual API endpoint
        const data = await response.json();
        const formattedEvents = data.map((event) => ({
          id: event.eid.trim(),
          eventname: event.ename,
          date: new Date(event.edate).toISOString().slice(0, 10), // Format to YYYY-MM-DD
          time: new Date(event.edate).toISOString().slice(11, 16), // Format to HH:MM
          category: event.edresscode, // You may adjust this based on your API data
          location: event.evenue,
          description: event.edescription,
          image: event.imageurl || './images/logos/event.jpg', // Use default image if none provided
        }));
        setEvents(formattedEvents);
        console.log(formattedEvents)
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally{
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <LinearWithValueLabel />
      </Box>
    );
    
  }

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
      // Reset editing event to null to ensure it's for adding a new event
      setEditingEvent(null); // Reset to add a new event, not edit
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
    
    // If editing an existing event
    if (editingEvent) {
      try {
        // Update event in local state
        setEvents(
          events.map((event) =>
            event.id === editingEvent.id ? { ...event, ...newEvent } : event
          )
        );
        setEditingEvent(null); // Reset after edit
        setSnackbarMessage("Event updated successfully")
        setShowAddEvent(false); 
  
        const neventData = {
          eName: newEvent.eventname,
          eDate: `${newEvent.date}T${newEvent.time}:00Z`,
          eVenue: newEvent.location,
          eDescription: newEvent.description,
          eDresscode: newEvent.category,
          cid: session?.user.cid,
        };
  
        // Send the updated event to the API
        const response = await fetch(`/api/events/${editingEvent.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(neventData),
        });
        // setShowAddEvent(false); 
  
        if (response.ok) {
          console.log('Event updated successfully');
          // setShowAddEvent(false); 
        } else {
          console.error('Failed to update event');
        }
  
        // After saving the edit, close the modal
        setShowAddEvent(false); // Ensure that the Add Event modal doesn't show up
  
      } catch (error) {
        console.error('Error updating event:', error);
      }
    } else {
      // If adding a new event
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
          // const savedEvent = await response.json();
          // setShowAddEvent(false);
          // setEvents([...events, savedEvent]); // Update local events with the saved event
          // setSnackbarMessage("Event added succesfully");
          // // Close the Add Event modal after saving

          const savedEvent = await response.json();
          setEvents([...events, savedEvent]); // Update local state with new event
          setSnackbarMessage("Event added successfully"); // Snackbar message
          setShowAddEvent(false); // Close modal
          
        } else {
          console.error('Failed to add event');
          setSnackbarMessage("Failed to add event"); // Snackbar message for failure
          setShowAddEvent(false);
        }
      } catch (error) {
        console.error('Error adding event:', error);
        // setSnackbarMessage("Error occurred while saving event"); // Snackbar message for error
        setShowAddEvent(false);
      }
      setSnackbarMessage("Event added successfully"); 
      setShowAddEvent(false);
    }
    
  
    // Reset the new event form after both adding and editing
    setNewEvent({
      eventname: '',
      date: '',
      time: '',
      category: 'Formal',
      location: '',
      description: '',
      image: null,
    });
    setShowAddEvent(false);
  };
  
  const handlePreviousMonth = () => {
    if (displayedMonth === 0) {
      setDisplayedMonth(11);
      setDisplayedYear(displayedYear - 1);
    } else {
      setDisplayedMonth(displayedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (displayedMonth === 11) {
      setDisplayedMonth(0);
      setDisplayedYear(displayedYear + 1);
    } else {
      setDisplayedMonth(displayedMonth + 1);
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event); // Set the event being edited
    setNewEvent({
      eventname: event.eventname,
      date: event.date,
      time: event.time,
      category: event.category,
      location: event.location,
      description: event.description,
      image: event.image,
    });
    
    setShowAddEvent(true); // Open the modal for editing
  };

  const handleDeleteEvent = (eventId) => {
    // Open delete confirmation modal
    setEventToDelete(eventId);
    setShowDeleteConfirmation(true);
  };
  
  const confirmDeleteEvent = async () => {
    try {
      // Make the DELETE request to the server
      const response = await fetch(`/api/events/${eventToDelete}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Successfully deleted event, now remove it from state
        setEvents(events.filter((event) => event.id !== eventToDelete));
        setSnackbarMessage("Event deleted successfully");
      } else {
        console.error("Failed to delete event");
        setSnackbarMessage("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      setSnackbarMessage("Error deleting event");
    }
    
    // Close confirmation modal after attempting to delete
    setShowDeleteConfirmation(false);
  };
  
  const handleCancelDelete = () => {
    // Close the confirmation modal without deleting
    setShowDeleteConfirmation(false);
    setEventToDelete(null);
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarMessage(""); // Close the Snackbar
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        image: URL.createObjectURL(file), // Create a local URL for the image preview
      }));
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Events and Calendar</h1>
      <div style={styles.monthNavigation}>
        <button onClick={handlePreviousMonth} style={styles.navButton}>
          <FaChevronLeft />
        </button>
        <h2>{`${new Date(displayedYear, displayedMonth).toLocaleString(
          "default",
          { month: "long" }
        )} ${displayedYear}`}</h2>
        <button onClick={handleNextMonth} style={styles.navButton}>
          <FaChevronRight />
        </button>
      </div>
      <div style={styles.grid}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} style={styles.weekDay}>
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>

      
      <div style={styles.upcomingContainer}>
        <h2 style={styles.subtitle}>Upcoming Events</h2>
        <button style={styles.addButton} onClick={() => setShowAddEvent(true)}>
          <FaPlus /> Add Event
        </button>
      </div>
      <div style={styles.eventCardContainer}>
        {" "}
        {/* Flexbox container for event cards */}
        {events.map((event) => (
          <div
            key={event.id}
            style={{ ...styles.eventCard, ...getCategoryColor(event.category) }}
          >
            <h3>{event.eventname}</h3>
            <p>
              <strong>Location:</strong> {event.location}
            </p>
            {/* <p>
              <strong>Description:</strong> {event.description}
            </p> */}
            {event.image && (
              <img src={event.image} alt="Event" style={styles.eventImage} />
            )}
            <p>
              <FaCalendarAlt /> {event.date} at {event.time}
            </p>
            <p>
              <FaClock /> Countdown: {getCountdown(event.date, event.time)}
            </p>
            {/* Edit and Delete Buttons */}
            <div style={styles.buttonContainer}>
              <button
                style={styles.editButton}
                onClick={() => handleEditEvent(event)}
              >
                Edit
              </button>
              <button
                style={styles.deleteButton}
                onClick={() => handleDeleteEvent(event.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedEvent && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>{selectedEvent.eventname}</h2>
            <p>
              <strong>Date:</strong> {selectedEvent.date}
            </p>
            <p>
              <strong>Time:</strong> {selectedEvent.time}
            </p>
            <p>
              <strong>Category:</strong> {selectedEvent.category}
            </p>
            <p>
              <strong>Location:</strong> {selectedEvent.location}
            </p>
            <p>
              <strong>Description:</strong> {selectedEvent.description}
            </p>
            <p>
              <strong>Countdown:</strong>{" "}
              {getCountdown(selectedEvent.date, selectedEvent.time)}
            </p>
            <button
              style={styles.cancelButton}
              onClick={() => setSelectedEvent(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

        {showDeleteConfirmation && (
          <div style={styles.modal}>
            <div
              style={{
                ...styles.modalContent,
                width: "300px",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <h3>Are you sure you want to delete this event?</h3>
              <div
                style={{
                  ...styles.modalActions,
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <button
                  onClick={handleCancelDelete}
                  style={{
                    backgroundColor: "#d9d9d9",
                    color: "#000000",
                    width: "80px",
                    borderWidth: "2px",
                    borderColor: "#007f5f",
                    padding: "8px 16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#C8C1C1")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#d9d9d9")}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteEvent}
                  style={{
                    backgroundColor: "#df0404",
                    color: "#ffffff",
                    width: "80px",
                    borderColor: "#f8dddd",
                    borderWidth: "2px",
                    padding: "8px 16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#f28c8c")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#df0404")}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}


      

      {showAddEvent && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>{editingEvent ? "Edit Event" : "Add New Event"}</h2>
            <form onSubmit={handleAddEvent}>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Event Name</label>
                <input
                  type="text"
                  value={newEvent.eventname}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, eventname: e.target.value })
                  }
                  required
                  style={styles.inputField}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Date</label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, date: e.target.value })
                  }
                  required
                  style={styles.inputField}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Time</label>
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, time: e.target.value })
                  }
                  required
                  style={styles.inputField}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Category</label>
                <select
                  value={newEvent.category}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, category: e.target.value })
                  }
                  style={styles.selectField}
                >
                  <option value="Formal">Formal</option>
                  <option value="Casual">Casual</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Location</label>
                <input
                  type="text"
                  value={newEvent.location}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, location: e.target.value })
                  }
                  required
                  style={styles.inputField}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Description</label>
                <input
                  type="text"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  required
                  style={styles.inputField}
                />
              </div>
              <div style={styles.inputGroup}>
                <label>Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
                {newEvent.image && (
                  <div style={styles.imagePreview}>
                    <img
                      src={newEvent.image}
                      alt="Event Preview"
                      style={styles.imagePreviewImg}
                    />
                  </div>
                )}
              </div>
              <div style={styles.formActions}>
                <button
                  type="button"
                  style={styles.cancelButton}
                  onClick={() => setShowAddEvent(false)}
                >
                  Cancel
                </button>
                <button type="submit" style={styles.saveButton}>
                  {editingEvent ? "Save Changes" : "Add Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Calendar;

