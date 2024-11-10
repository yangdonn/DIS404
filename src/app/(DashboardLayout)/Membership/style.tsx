export const styles = {
    container: {
      width: '90%',  // Increased the width to make the table larger
      margin: '20px auto',
      backgroundColor: '#fff',
      borderRadius: '10px',
      padding: '30px',  // Increased padding for a bigger feel
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    title: {
      fontSize: '22px',
      marginBottom: '0',
    },
    subTitle: {
      fontSize: '14px',
      color: '#34d399', // Green color for "Active Members"
      marginTop: '7px',
      fontWeight: 300, // Thinner font weight for Active Members
      fontStyle: 'italic',
    },
    searchInput: {
      padding: '12px', // Increased padding for a bigger input
      border: '1px solid #ccc',
      borderRadius: '5px',
      marginRight: '10px',

    },
    select: {
      padding: '12px', // Increased padding for a bigger select dropdown
      border: '1px solid #ccc',
      borderRadius: '5px',
      marginRight: '10px',
    },
    addButton: {
      padding: '10px 20px',               // Reduced vertical padding for smaller height
      backgroundColor: '#4CAF50',        // Light greenish-blue background
      color: 'white',                  // Dark greenish-blue text
      border: '1px solid #16C098',       // Dark greenish-blue border
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 300,                // Bold text to match the image
      backgroundClip: 'padding-box',     // Ensures border and background don't overlap
      marginRight: '10px',
    },
    importButton: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
        fontSize: '16px',
      },
      inputFile: {
        display: 'none',
      },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      padding: '18px', // Increased padding for bigger table headers
      textAlign: 'left',
      backgroundColor: '#f3f4f6',
      color: '#333',
      borderBottom: '1px solid #ddd',
      fontSize: '16px', // Slightly larger text size for the headers
    },
    td: {
      padding: '18px', // Increased padding for bigger table cells
      textAlign: 'left',
      borderBottom: '1px solid #ddd',
      fontSize: '16px', // Slightly larger text size for the cells
    },
    
    buttonContainer: {
      display: 'flex', // Ensures buttons are in a row
      gap: '10px', // Space between the buttons
    },
    editButton: {
      padding: '6px 15px',
      backgroundColor: '#A7F3D0',
      color: '#065F46',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    deleteButton: {
      padding: '6px 15px',
      backgroundColor: '#FEE2E2',
      color: '#B91C1C',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
   modalContent: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    width: '500px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  modalSubTitle: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },
  column: {
    flex: 1,
  },
  modalInput: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
  },
  modalButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  modalCancelButton: {
    padding: '8px 15px',
    backgroundColor: '#ddd',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
  },
  modalSubmitButton: {
    padding: '8px 15px',
    backgroundColor: '#34d399',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
  },
  };