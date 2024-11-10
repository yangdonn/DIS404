"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { styles } from "./style";
import * as XLSX from "xlsx";
import { MemberData } from "./interfaces/MemberData";
import { Member } from "./interfaces/Member";
import Modal from "./Modal";

const MembersTable = () => {
  const { data: session } = useSession();
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentMember, setCurrentMember] = useState<MemberData | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [mode, setMode] = useState<"edit" | "add">("add");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [jsonData, setJsonData] = useState([]);

  // new adde hder
  const [currentPage, setCurrentPage] = useState(1);

  const membersPerPage = 10; // Number of members per page
  const totalPages = Math.ceil(members.length / membersPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const renderPageNumbers = pageNumbers.map((number) => (
    <button
      key={number}
      onClick={() => handlePageClick(number)}
      style={{
        padding: "5px 10px",
        margin: "0 5px",
        backgroundColor: currentPage === number ? "#007BFF" : "#f0f0f0",
        border: "1px solid #ddd",
        cursor: "pointer",
      }}
    >
      {number}
    </button>
  ));
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });

        // Assuming you're working with the first sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert the sheet to JSON
        let json = XLSX.utils.sheet_to_json(sheet);

        // Convert `stdID` and `stdyear` to strings, and add leading zero to stdID
        json = json.map((row) => ({
          ...row,
          stdID: String(row.stdID).padStart(8, "0"), // Add leading zero to stdID (assuming stdID should be 8 characters)
          stdyear: String(row.stdyear), // Convert stdyear to string
          stdemail: `${String(row.stdID).padStart(8, "0")}.cst@rub.edu.bt`,
        }));

        // Set the JSON data to state
        setJsonData(json);
        console.log(JSON.stringify(jsonData, null, 2));
        submitData();
      };

      reader.readAsBinaryString(file); // Read the file as binary string
    }
  };

  if (!isVisible) return null;

  return (
    <div style={styles.modalOverlay as React.CSSProperties}>
      <div style={styles.modalContent}>
        <h2 style={styles.modalTitle}>
          {mode === "edit" ? "Edit Member" : "Add New Member"}
        </h2>
        <p style={styles.modalSubTitle}>
          {mode === "edit"
            ? "Edit member details"
            : "Invite new members to the club"}
        </p>
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
              {errors.firstName && (
                <p style={{ color: "red" }}>{errors.firstName}</p>
              )}
            </div>
            <div style={styles.column}>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={newMember.lastName}
                onChange={handleChange}
                style={styles.modalInput}
              />
              {errors.lastName && (
                <p style={{ color: "red" }}>{errors.lastName}</p>
              )}
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
              {errors.studentnum && (
                <p style={{ color: "red" }}>{errors.studentnum}</p>
              )}{" "}
              {/* Render the error message */}
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
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
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
                <option value="" disabled>
                  Select Department
                </option>
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
            <button
              type="button"
              onClick={onClose}
              style={styles.modalCancelButton}
            >
              Cancel
            </button>
            <button type="submit" style={styles.modalSubmitButton}>
              {mode === "edit" ? "Save Changes" : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const MembersTable = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentMember, setCurrentMember] = useState<MemberData | null>(null);
  const [members, setMembers] = useState<Member[]>(membersData);
  const [mode, setMode] = useState<"edit" | "add">("add");
  
  const fetchMembers = async (userId: string) => {
    try {
      const response = await fetch(`/api/getMembers/${userId}`);
      if (!response.ok) throw new Error('Network response was not ok');
  
      const data = await response.json();
  
      // Map API response to match MemberData structure
      const formattedMembers = data.map((member: any) => {
        const [firstName, lastName] = member.stdname.split(" "); // Split the name into first and last
  
        return {
          name: member.stdname,
          studentnum: member.stdid,
          department: member.pname,
          email: member.stdemail,
          gender:member.stdgender,
          year: Number(member.stdyear),
        };
      });
  
      setMembers(formattedMembers);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };
  useEffect(() => {
    if (session) {
      fetchMembers(session.user.mid);
    }
  }, [session]);

  useEffect(() => {
    if (jsonData.length > 0) {
      submitData();
    }
  }, [jsonData]);
  

  const submitData = async () => {
    for (const member of jsonData) {
      try {
        const response = await fetch('/api/members', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(member),
        });
        console.log(JSON.stringify(member))
        
        if (response.ok) {
          console.log(`Member ${member.stdID} added successfully`);
        } else {
          console.log(`Failed to add member ${member.stdID}`);
        }
      } catch (error) {
        console.error(`Error adding member ${member.stdID}:`, error);
      }
    }
  };
  
  const departmentMapping = {
    'Architecture': 'P01',
    'ICE': 'P06',
    'IT': 'P07',
    'Electrical': 'P03',
    'ECE': 'P04',
    'Civil': 'P02',
    'Geology': 'P05'
  };

  const handleAddMember = async (newMember: MemberData) => {
    // Check if the student number already exists in the current members list
    const isDuplicate = members.some(
      (member) => member.studentnum === newMember.studentnum
    );

    if (isDuplicate) {
      alert(
        "A member with this student number already exists. Please use a unique student number."
      );
      return; // Stop the function if a duplicate is found
    }
    const isDuplicate = members.some(member => member.studentnum === newMember.studentnum);
    if (isDuplicate) {
        alert("A member with this student number already exists. Please use a unique student number.");
        return; // Stop the function if a duplicate is found
    }

 

    const fullName = `${newMember.firstName} ${newMember.lastName}`;
    const updatedMember: Member = {
      name: fullName, // Combine firstName and lastName into a full name
      studentnum: newMember.studentnum,
      email: newMember.email,
      year: newMember.year,
      department: newMember.department,
        name: fullName,
        studentnum: newMember.studentnum,
        email: newMember.email,
        year: newMember.year,
        department: newMember.department,
        gender: ''
    };
    const departmentCode = departmentMapping[newMember.department] || "Unknown";
    const sendData = {
      stdID: newMember.studentnum,
      stdName: fullName,
      stdyear: newMember.year.toString(),
      stdgender: newMember.gender[0],
      stdemail: newMember.email,
      pid: departmentCode,
    };

    try {
      const response = await fetch(`/api/members/${session.user.cid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });

      if (response.ok) {
        setMembers((prev) => [...prev, updatedMember]);
        setModalVisible(false); // Close the modal after adding
        alert("Member added successfully");
      } else {
        alert("Failed to add member. Please try again.");
      }
    } catch (error) {
      console.error("Error adding member:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleEditMember = async (editedMember: MemberData) => {
    const fullName = `${editedMember.firstName} ${editedMember.lastName}`;
    const updatedMember: Member = {
      name: fullName, // Combine firstName and lastName into a full name
      studentnum: editedMember.studentnum,
      email: editedMember.email,
      year: editedMember.year,
      department: editedMember.department,
      gender: "",
    };
    setMembers((prev) =>
      prev.map((member) =>
        member.studentnum === editedMember.studentnum ? updatedMember : member
      )
    );
    setModalVisible(false); // Close the modal after submission

    const departmentCode = departmentMapping[editedMember.department] || 'Unknown';
    const sendData = {
        stdName: fullName,
        stdyear: editedMember.year.toString(),
        stdgender: editedMember.gender[0],
        stdemail: editedMember.email,
        pid: departmentCode,
        cid: session?.user.cid
    };
    try {
      const response = await fetch(`/api/addMember/${editedMember.studentnum}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
      });

      if (response.ok) {
        setMembers((prev) => 
          prev.map((member) => 
            member.studentnum === editedMember.studentnum ? updatedMember : member
          )
        );
        setModalVisible(false); // Close the modal after submission
          alert("Member Edited successfully");
      } else {
          alert("Failed to Edit member. Please try again.");
      }
    } catch (error) {
      console.error("Error Editing member:", error);
      alert("An error occurred. Please try again later.");
  }


  };
  // Delete member function
  const handleDeleteMember = (studentnum: string) => {
    // Filter out the member whose studentnum matches
    setMembers((prev) =>
      prev.filter((member) => member.studentnum !== studentnum)
    );
  };
  const handleDeleteMember = async (studentnum: string) => {
    try {
      // Send a DELETE request to the API to remove the member from the database
      const response = await fetch(`/api/members/${studentnum}`, {
        method: 'DELETE',
      });
  
      // Check if the deletion was successful
      if (response) {
        // Filter out the member whose studentnum matches
        setMembers((prev) => prev.filter(member => member.studentnum !== studentnum));
        alert("Member deleted successfully");
      } else {
        alert("Error deleting member");
      }
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("Failed to delete member");
    }
  };
  
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.studentnum.toString().includes(searchQuery) || // Assuming studentnum is a number
    member.department.toLowerCase().includes(searchQuery.toLowerCase()) || 
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);

  const handleSortChange = (e) => {
    const criteria = e.target.value;
    setSortCriteria(criteria);
  };
  
  // Function to sort members based on the selected criteria
  const sortedMembers = [...members].sort((a, b) => {
    if (sortCriteria === 'Year') {
      return a.year - b.year; // Ascending order by year
    } else if (sortCriteria === 'Department') {
      return a.department.localeCompare(b.department); // Ascending order by department
    }
    return 0; // No sorting if no criteria is selected
  });

  const openEditModal = (member: Member) => {
    const nameParts = member.name.split(" ");
    const firstName = nameParts.shift() || "";
    const lastName = nameParts.join(" ") || "";
    setCurrentMember({
      firstName,
      lastName,
      studentnum: member.studentnum,
      email: member.email,
      year: member.year,
      department: member.department,
    });
    setMode("edit");
    setModalVisible(true);
  };

  const openAddModal = () => {
    setCurrentMember({
      firstName: "",
      lastName: "",
      studentnum: "",
      email: "",
      year: 1,
      department: "",
    }); // Reset current member for adding
    setMode("add");
    setModalVisible(true); // Open the modal for adding
    firstName: '',
    lastName: '',
    studentnum: '',
    gender: '',
    email: '',
    year: 1,
    department: '',
  }); // Reset current member for adding
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
          <input type="text" placeholder="Search" style={styles.searchInput} />
          <select style={styles.select}>
            <option>Sort by: Newest</option>
            <option>Sort by: Oldest</option>
        <input
            type="text"
            placeholder="Search"
            style={styles.searchInput}
            value={searchQuery} // Bind the input to the searchQuery state
            onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
          />
          <select style={styles.select} onChange={handleSortChange}>
            <option value="">Sort by: None</option>
            <option value="Year">Sort by: Year</option>
            <option value="Department">Sort by: Department</option>
          </select>
          <button onClick={openAddModal} style={styles.addButton}>
            Add
          </button>{" "}
          {/* Open add modal */}
          <button style={styles.importButton}>Import</button>
          <button onClick={openAddModal} style={styles.addButton}>Add</button> {/* Open add modal */}
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            style={styles.inputFile}
            id="fileInput"
          />
          {/* Custom button that triggers the file input */}
          <label htmlFor="fileInput" style={styles.importButton}>
            Import
          </label>
                {/* Display the imported data (optional)
          <pre>{JSON.stringify(jsonData, null, 2)}</pre> */}
        </div>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Student Number</th>
            <th style={styles.th}>Gender</th>
            <th style={styles.th}>Department</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Year</th>
            <th style={styles.th}>Modify</th>
          </tr>
        </thead>
        <tbody>
          {currentMembers
            .filter(
              (member) =>
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.studentnum
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                member.gender
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                member.email.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .sort((a, b) => {
              if (sortCriteria === "Year") {
                return a.year - b.year;
              } else if (sortCriteria === "Department") {
                return a.department.localeCompare(b.department);
              }
              return 0;
            })
            .map((member, index) => (
              <tr key={index}>
                <td style={styles.td}>{member.name}</td>
                <td style={styles.td}>{member.studentnum}</td>
                <td style={styles.td}>{member.gender}</td>
                <td style={styles.td}>{member.department}</td>
                <td style={styles.td}>{member.email}</td>
                <td style={styles.td}>{member.year}</td>
                <td style={styles.td}>
                  <div style={styles.buttonContainer}>
                    {/* Pass the correct member to openEditModal */}
                    <button
                      onClick={() => openEditModal(member)}
                      style={styles.editButton}
                    >
                      Edit
                    </button>
                    {/* Connect delete button with delete handler */}
                    <button
                      onClick={() => handleDeleteMember(member.studentnum)}
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {renderPageNumbers}
      </div>
      {/* Include the Modal component here */}
      <Modal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={mode === "edit" ? handleEditMember : handleAddMember}
        memberData={currentMember} // Pass current member data for editing
        mode={mode} // Pass the mode (add or edit)
      />
    </div>
  );
};

const styles = {
  container: {
    width: "90%", // Increased the width to make the table larger
    margin: "20px auto",
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "30px", // Increased padding for a bigger feel
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "20px",
    marginBottom: "0",
  },
  subTitle: {
    fontSize: "14px",
    color: "#34d399", // Green color for "Active Members"
    marginTop: "7px",
    fontWeight: 300, // Thinner font weight for Active Members
  },
  searchInput: {
    padding: "12px", // Increased padding for a bigger input
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginRight: "10px",
  },
  select: {
    padding: "12px", // Increased padding for a bigger select dropdown
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginRight: "10px",
  },
  addButton: {
    padding: "8px 15px", // Reduced vertical padding for smaller height
    backgroundColor: "#A7EDEA", // Light greenish-blue background
    color: "#16C098", // Dark greenish-blue text
    border: "1px solid #16C098", // Dark greenish-blue border
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: 300, // Bold text to match the image
    backgroundClip: "padding-box", // Ensures border and background don't overlap
    marginRight: "10px",
  },
  importButton: {
    padding: "8px 15px", // Reduced vertical padding for smaller height
    backgroundColor: "#A7EDEA", // Light greenish-blue background
    color: "#16C098", // Dark greenish-blue text
    border: "1px solid #16C098", // Dark greenish-blue border
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: 300, // Bold text to match the image
    backgroundClip: "padding-box", // Ensures border and background don't overlap
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    padding: "18px", // Increased padding for bigger table headers
    textAlign: "left",
    backgroundColor: "#f3f4f6",
    color: "#333",
    borderBottom: "1px solid #ddd",
    fontSize: "16px", // Slightly larger text size for the headers
  },
  td: {
    padding: "18px", // Increased padding for bigger table cells
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    fontSize: "16px", // Slightly larger text size for the cells
  },
  buttonContainer: {
    display: "flex", // Ensures buttons are in a row
    gap: "10px", // Space between the buttons
  },
  editButton: {
    padding: "4px 12px",
    backgroundColor: "#A7F3D0", // Light green background
    color: "#16C098", // Dark green text
    border: "1px solid #16C098", // Dark green border
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: 300, // Bold text to match the image
    backgroundClip: "padding-box", // Ensures border and background don't overlap
  },
  deleteButton: {
    padding: "4px 12px",
    backgroundColor: "#FEECEC", // Light red background
    color: "#FF0000", // Red text
    border: "1px solid #FF0000", // Red border
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: 300, // Bold text to match the image
    backgroundClip: "padding-box", // Ensures border and background don't overlap
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    width: "500px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  modalTitle: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  modalSubTitle: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  column: {
    flex: 1,
  },
  modalInput: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
  },
  modalButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  modalCancelButton: {
    padding: "8px 15px",
    backgroundColor: "#ddd",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
  },
  modalSubmitButton: {
    padding: "8px 15px",
    backgroundColor: "#34d399",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
  },
};

export default MembersTable;
