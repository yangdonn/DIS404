"use client";
import { eventNames } from "process";
import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaPlus,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [displayedMonth, setDisplayedMonth] = useState(currentDate.getMonth());
  const [displayedYear, setDisplayedYear] = useState(currentDate.getFullYear());
  const [events, setEvents] = useState([
    {
      id: 1,
      eventname: "Team Meeting",
      date: "2023-06-15",
      time: "10:00",
      category: "work",
      location: "Team Work Hall",
      description: "Club meeting",
      image: null,
    },
    {
      id: 2,
      eventname: "Birthday Party",
      date: "2023-06-20",
      time: "18:00",
      category: "personal",
      location: "Basketball Court",
      description: "Birthday Party",
      image: null,
    },
    {
      id: 3,
      eventname: "Project Deadline",
      date: "2023-06-30",
      time: "23:59",
      category: "work",
      location: "CR-17",
      description: "Vle Submission",
      image: null,
    },
  ]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    eventname: "",
    date: "",
    time: "",
    category: "work",
    location: "",
    description: "",
    image: null,
  });
  const [editingEvent, setEditingEvent] = useState(null); // null means we're adding a new event

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
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
              setEditingEvent(dayEvents[0]);
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
              {/* <p style={styles.smallText}>{event.location}</p>
              <p style={styles.smallText}>{event.description}</p> */}
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
      case "work":
        return styles.workCategory;
      case "personal":
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

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (editingEvent) {
      // Edit existing event
      setEvents(
        events.map((event) =>
          event.id === editingEvent.id
            ? { ...editingEvent, ...newEvent }
            : event
        )
      );
      setEditingEvent(null); // Reset after edit
    } else {
      // Add new event
      setEvents([...events, { ...newEvent, id: events.length + 1 }]);
    }
    setNewEvent({
      eventname: "",
      date: "",
      time: "",
      category: "work",
      location: "",
      description: "",
      image: null,
    });
    setShowAddEvent(false); // Close modal after save
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
    const filteredEvents = events.filter((event) => event.id !== eventId);
    setEvents(filteredEvents);
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
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
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
    </div>
  );
};

export default Calendar;

const styles = {
  container: { padding: "20px", fontFamily: "Arial, sans-serif" },
  title: { fontSize: "24px", marginBottom: "10px" },
  monthNavigation: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  navButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "5px",
    marginBottom: "20px",
  },
  weekDay: { fontWeight: "bold", textAlign: "center" },
  dayCell: {
    border: "1px solid #ddd",
    height: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    cursor: "pointer",
    padding: "5px",
  },
  dayNumber: { fontSize: "16px", fontWeight: "bold" },
  currentDay: { backgroundColor: "#f0f8ff" },
  eventCardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // Now explicitly set to 4 columns
    gap: "10px", // Adds space between the cards
    maxWidth: "100%", // Ensures cards fit within the container
  },
  eventCard: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  modal: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // Ensure it appears above other content
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    maxWidth: "400px",
    width: "100%",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    animation: "fadeIn 0.3s ease",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  inputLabel: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#333",
  },
  inputField: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "border-color 0.3s",
  },
  inputFieldFocus: {
    borderColor: "#007bff",
  },
  selectField: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "border-color 0.3s",
  },
  formActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    padding: "15px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  cancelButtonHover: {
    backgroundColor: "#5a6268",
  },
  saveButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  saveButtonHover: {
    backgroundColor: "#218838",
  },
  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  addButton: {
    backgroundColor: "#5D87FF",
    color: "#fff",
    border: "none",
    padding: "15px 20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  workCategory: { backgroundColor: "#ffffff", color: "#000" },
  personalCategory: { backgroundColor: "#f0f0f0", color: "#000" },
  defaultCategory: { backgroundColor: "#6c757d", color: "#fff" },
  upcomingContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  subtitle: { fontSize: "18px" },

  // 2222
  buttonContainer: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
  },

  editButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },

  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginLeft: "10px", // Optional for spacing between buttons
  },

  editButtonHover: {
    backgroundColor: "#0056b3",
  },

  deleteButtonHover: {
    backgroundColor: "#c82333",
  },

  imagePreview: {
    marginTop: "10px",
  },
  imagePreviewImg: {
    maxWidth: "100%",
    maxHeight: "100px",
    objectFit: "cover",
  },

  eventImage: {
    width: "100%", // Make the image fill the width of the card
    height: "auto", // Maintain the aspect ratio
    objectFit: "cover", // Ensure the image covers the available space
    borderRadius: "2px",
    marginTop: "10px",
  },
  eventCard: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    height: "auto", // Set a fixed height for the card
    // overflow: "hidden", // Hide overflow to prevent stretching from content
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  // eventImage: {
  //   maxWidth: "100%",
  //   maxHeight: "100px", // Limit the image height
  //   objectFit: "cover", // Ensure the image fits nicely within the height limit
  //   borderRadius: "4px",
  // },
};
