"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { styles } from './style';
import * as XLSX from 'xlsx';
import { MemberData } from './interfaces/MemberData';
import { Member } from './interfaces/Member';
import Modal from './Modal';

const MembersTable = () => {
  const {data: session} = useSession();
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentMember, setCurrentMember] = useState<MemberData | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [mode, setMode] = useState<'edit' | 'add'>('add');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
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
        padding: '5px 10px',
        margin: '0 5px',
        backgroundColor: currentPage === number ? '#007BFF' : '#f0f0f0',
        border: '1px solid #ddd',
        cursor: 'pointer',
      }}
    >
      {number}
    </button>
  ));
  const handleFileChange = (event) => {
    const file = event.target.files[0];  // Get the selected file
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
  
        // Assuming you're working with the first sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
  
        // Convert the sheet to JSON
        let json = XLSX.utils.sheet_to_json(sheet);
  
        // Convert `stdID` and `stdyear` to strings, and add leading zero to stdID
        json = json.map((row) => ({
          ...row,
          stdID: String(row.stdID).padStart(8, '0'), // Add leading zero to stdID (assuming stdID should be 8 characters)
          stdyear: String(row.stdyear), // Convert stdyear to string
          stdemail: `${String(row.stdID).padStart(8, '0')}.cst@rub.edu.bt`
        }));
  
        // Set the JSON data to state
        setJsonData(json);
        console.log(JSON.stringify(jsonData, null, 2));
        submitData();
      };
  
      reader.readAsBinaryString(file); // Read the file as binary string
    }
  };
  
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
    const isDuplicate = members.some(member => member.studentnum === newMember.studentnum);
    if (isDuplicate) {
        alert("A member with this student number already exists. Please use a unique student number.");
        return; // Stop the function if a duplicate is found
    }

 

    const fullName = `${newMember.firstName} ${newMember.lastName}`;
    const updatedMember: Member = {
        name: fullName,
        studentnum: newMember.studentnum,
        email: newMember.email,
        year: newMember.year,
        department: newMember.department,
        gender: ''
    };
    const departmentCode = departmentMapping[newMember.department] || 'Unknown';
    const sendData = {
        stdID: newMember.studentnum,
        stdName: fullName,
        stdyear: newMember.year.toString(),
        stdgender: newMember.gender[0],
        stdemail: newMember.email,
        pid: departmentCode
    };

    try {
        const response = await fetch(`/api/members/${session.user.cid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
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
      gender: ''
    };

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
    const nameParts = member.name.split(' ');
    const firstName = nameParts.shift() || '';
    const lastName = nameParts.join(' ') || '';
  setCurrentMember({
    firstName,
    lastName,
    studentnum: member.studentnum,
    gender: member.gender,
    email: member.email,
    year: member.year,
    department: member.department,
  });
    setMode('edit');
    setModalVisible(true);
  };

  const openAddModal = () => {
    setCurrentMember({
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
          .filter((member) => 
            member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.studentnum.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.email.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .sort((a, b) => {
            if (sortCriteria === 'Year') {
              return a.year - b.year;
            } else if (sortCriteria === 'Department') {
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
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {renderPageNumbers}
      </div>
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

export default MembersTable;