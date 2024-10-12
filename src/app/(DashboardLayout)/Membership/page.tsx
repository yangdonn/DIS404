"use client";

import { useState, useEffect } from 'react';

const membersData = [
  {
    name: "Jane Cooper",
    studentnum: "02210210",
    department: "Electrical",
    email: "jane@microsoft.com",
    year: 1,
  },
  {
    name: "Floyd Miles",
    studentnum: "02210211",
    department: "Electrical",
    email: "floyd@yahoo.com",
    year: 2,
  },
  {
    name: "Ronald Richards",
    studentnum: "02210277",
    department: "Geology",
    email: "ronald@adobe.com",
    year: 3,
  },
  {
    name: "Marvin McKinney",
    studentnum: "02210287",
    department: "Civil",
    email: "marvin@apple.com",
    year: 4,
  },
  {
    name: "Kathryn Murphy",
    studentnum: "02210234",
    department: "Software",
    email: "kathryn@google.com",
    year: 1,
  },
  {
    name: "Dianne Russell",
    studentnum: "02210290",
    department: "IT",
    email: "dianne@amazon.com",
    year: 3,
  },
  {
    name: "Jacob Jones",
    studentnum: "02210255",
    department: "IT",
    email: "jacob@tesla.com",
    year: 2,
  },
  {
    name: "Cameron Williamson",
    studentnum: "02210245",
    department: "IT",
    email: "cameron@ibm.com",
    year: 1,
  },
  {
    name: "Courtney Henry",
    studentnum: "02210291",
    department: "ECE",
    email: "courtney@netflix.com",
    year: 2,
  },
  {
    name: "Leslie Alexander",
    studentnum: "02210282",
    department: "ECE",
    email: "leslie@facebook.com",
    year: 4,
  },
  {
    name: "Guy Hawkins",
    studentnum: "02210253",
    department: "ICE",
    email: "guy@spotify.com",
    year: 2,
  },
  {
    name: "Jenny Wilson",
    studentnum: "02210228",
    department: "ICE",
    email: "jenny@salesforce.com",
    year: 3,
  },
  {
    name: "Kristin Watson",
    studentnum: "02210214",
    department: "Electrical",
    email: "kristin@oracle.com",
    year: 2,
  },
  {
    name: "Jerome Bell",
    studentnum: "02210235",
    department: "IT",
    email: "jerome@intel.com",
    year: 4,
  },
  {
    name: "Sara Lindgren",
    studentnum: "02210221",
    department: "Geology",
    email: "sara@slack.com",
    year: 1,
  },
  {
    name: "Tommy Anderson",
    studentnum: "02210252",
    department: "IT",
    email: "tommy@dropbox.com",
    year: 2,
  }
  // Additional data can be added here...
];
interface ModalProps {
  isVisible: boolean;                  // Boolean for modal visibility
  onClose: () => void;                 // Function for closing modal
  onSubmit: () => void;                // Function for form submission
  memberData?: {    
    firstName: string,
    lastName: string,                   // Optional memberData object
    studentnum: string;
    email: string;
    year: number;
    department: string;
  };
  mode: 'edit' | 'add';                // Either 'edit' or 'add' mode
}
interface Member {
  name: string;
  studentnum: string;
  email: string;
  year: number;
  department: string;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, onSubmit, memberData, mode }) => {
  // Set initial member data based on mode
  const [newMember, setNewMember] = useState(memberData || {
    firstName: '',
    lastName: '',
    studentnum: '',
    email: '',
    year: 1,
    department: '',
  });
  useEffect(() => {
    if (mode === 'edit' && memberData) {
      // const [firstName, lastName] = memberData.name.split(' ');
      setNewMember({
        firstName: memberData.firstName,
        lastName: memberData.lastName,
        studentnum: memberData.studentnum,
        email: memberData.email,
        year: memberData.year,
        department: memberData.department,
      });
    } else {
      setNewMember({
        firstName: '',
        lastName: '',
        studentnum: '',
        email: '',
        year: 1,
        department: '',
      });
    }
  }, [memberData, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // const fullName = `${newMember.firstName} ${newMember.lastName}`;
  
    // const newMemberData = {
    //   ...newMember,
    //   // name: fullName,  // Combine firstName and lastName
    // };
    // backend code 
    // onSubmit();
    onClose(); // Close modal after submission
  };

  if (!isVisible) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 style={styles.modalTitle}>{mode === 'edit' ? 'Edit Member' : 'Add New Member'}</h2>
        <p style={styles.modalSubTitle}>{mode === 'edit' ? 'Edit member details' : 'Invite new members to the club'}</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.column}>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={newMember.firstName}
                onChange={handleChange}
                required
                style={styles.modalInput}
              />
            </div>
            <div style={styles.column}>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={newMember.lastName}
                onChange={handleChange}
                required
                style={styles.modalInput}
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.column}>
              <label>Student Number</label>
              <input
                type="text"
                name="studentnum"
                placeholder="Student Number"
                value={newMember.studentnum}
                onChange={handleChange}
                required
                style={styles.modalInput}
              />
            </div>
            <div style={styles.column}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newMember.email}
                onChange={handleChange}
                required
                style={styles.modalInput}
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.column}>
              <label>Year</label>
              <input
                type="number"
                name="year"
                placeholder="Year"
                value={newMember.year}
                onChange={handleChange}
                min="1"
                max="4"
                required
                style={styles.modalInput}
              />
            </div>
            <div style={styles.column}>
              <label>Department</label>
              <select
                name="department"
                value={newMember.department}
                onChange={handleChange}
                required
                style={styles.modalInput}
              >
                <option value="" disabled>Select Department</option>
                <option value="IT">IT</option>
                <option value="Electrical">Electrical</option>
                <option value="ECE">ECE</option>
                <option value="Civil">Civil</option>
                <option value="Geology">Geology</option>
                <option value="Architecture">Architecture</option>
                <option value="ICE">ICE</option>
              </select>
            </div>
          </div>

          <div style={styles.modalButtonContainer}>
            <button type="button" onClick={onClose} style={styles.modalCancelButton}>Cancel</button>
            <button type="submit" style={styles.modalSubmitButton}>
              {mode === 'edit' ? 'Save Changes' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const MembersTable = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [members, setMembers] = useState(membersData);
  const [mode, setMode] = useState('add');

  const handleAddMember = (newMember) => {
    setMembers((prev) => [...prev, newMember]);
    setModalVisible(false); // Close the modal after adding
  };

  const handleEditMember = (editedMember) => {
    setMembers((prev) => 
      prev.map((member) => 
        member.studentnum === editedMember.studentnum ? editedMember : member
      )
    );
    setModalVisible(false); // Close the modal after submission
  };
  // Delete member function
  const handleDeleteMember = (studentnum) => {
    // Filter out the member whose studentnum matches
    setMembers((prev) => prev.filter(member => member.studentnum !== studentnum));
  };

  const openEditModal = (member: Member) => {
    const [firstName, lastName] = member.name.split(' ');
  setCurrentMember({
    firstName,
    lastName,
    studentnum: member.studentnum,
    email: member.email,
    year: member.year,
    department: member.department,
  });
    setMode('edit');
    setModalVisible(true);
  };

  const openAddModal = () => {
    setCurrentMember(null); // Reset current member for adding
    setMode('add');
    setModalVisible(true);  // Open the modal for adding
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>All Members</h1>
          <h2 style={styles.subTitle}>Active Members</h2>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search"
            style={styles.searchInput}
          />
          <select style={styles.select}>
            <option>Sort by: Newest</option>
            <option>Sort by: Oldest</option>
          </select>
          <button onClick={openAddModal} style={styles.addButton}>Add</button> {/* Open add modal */}
          <button style={styles.importButton}>Import</button>
        </div>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Student Number</th>
            <th style={styles.th}>Department</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Year</th>
            <th style={styles.th}>Modify</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td style={styles.td}>{member.name}</td>
              <td style={styles.td}>{member.studentnum}</td>
              <td style={styles.td}>{member.department}</td>
              <td style={styles.td}>{member.email}</td>
              <td style={styles.td}>{member.year}</td>
              <td style={styles.td}>
                <div style={styles.buttonContainer}>
                  {/* Pass the correct member to openEditModal */}
                  <button onClick={() => openEditModal(member)} style={styles.editButton}>Edit</button>
                  {/* Connect delete button with delete handler */}
          <button 
            onClick={() => handleDeleteMember(member.studentnum)} 
            style={styles.deleteButton}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Include the Modal component here */}
      <Modal 
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)} 
        onSubmit={mode === 'edit' ? handleEditMember : handleAddMember} 
        memberData={currentMember} // Pass current member data for editing
        mode={mode} // Pass the mode (add or edit)
      />
    </div>
  );
};


const styles = {
  container: {
    width: '90%',  // Increased the width to make the table larger
    margin: '20px auto',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '30px',  // Increased padding for a bigger feel
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '20px',
    marginBottom: '0',
  },
  subTitle: {
    fontSize: '14px',
    color: '#34d399', // Green color for "Active Members"
    marginTop: '7px',
    fontWeight: 300, // Thinner font weight for Active Members
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
    padding: '8px 15px',               // Reduced vertical padding for smaller height
    backgroundColor: '#A7EDEA',        // Light greenish-blue background
    color: '#16C098',                  // Dark greenish-blue text
    border: '1px solid #16C098',       // Dark greenish-blue border
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 300,                // Bold text to match the image
    backgroundClip: 'padding-box',     // Ensures border and background don't overlap
    marginRight: '10px',
  },
  importButton: {
    padding: '8px 15px',               // Reduced vertical padding for smaller height
    backgroundColor: '#A7EDEA',        // Light greenish-blue background
    color: '#16C098',                  // Dark greenish-blue text
    border: '1px solid #16C098',       // Dark greenish-blue border
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 300,                // Bold text to match the image
    backgroundClip: 'padding-box',     // Ensures border and background don't overlap
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
    padding: '4px 12px',
    backgroundColor: '#A7F3D0',  // Light green background
    color: '#16C098',            // Dark green text
    border: '1px solid #16C098',  // Dark green border
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 300,           // Bold text to match the image
    backgroundClip: 'padding-box' // Ensures border and background don't overlap
  },
  deleteButton: {
    padding: '4px 12px',
    backgroundColor: '#FEECEC',   // Light red background
    color: '#FF0000',             // Red text
    border: '1px solid #FF0000',  // Red border
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 300,           // Bold text to match the image
    backgroundClip: 'padding-box' // Ensures border and background don't overlap
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

export default MembersTable;




