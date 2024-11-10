
export const styles = {
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
    
  };
  