import React, { useState, useEffect } from 'react';
import { ModalProps } from './interfaces/ModalProps';
import { MemberData } from './interfaces/MemberData';
import { styles } from './style';

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, onSubmit, memberData, mode }) => {
    // Set initial member data based on mode
    const [newMember, setNewMember] = useState<MemberData>(memberData || {
      firstName: '',
      lastName: '',
      studentnum: '',
      gender: '',
      email: '',
      year: 1,
      department: '',
    });
  
    const [errors, setErrors] = useState({
      firstName: '',
      lastName: '',
      email: '',
      studentnum: '',
    });
  
    useEffect(() => {
      if (mode === 'edit' && memberData) {
        // const [firstName, lastName] = memberData.name.split(' ');
        setNewMember({
          firstName: memberData.firstName,
          lastName: memberData.lastName,
          studentnum: memberData.studentnum,
          gender: memberData.gender,
          email: memberData.email,
          year: memberData.year,
          department: memberData.department,
        });
      } else if (mode == 'add'){
        setNewMember({
          firstName: '',
          lastName: '',
          studentnum: '',
          gender:'',
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
  
    const validateForm = () => {
      let valid = true;
      let newErrors = { firstName: '', lastName: '', email: '', studentnum: '' };
  
      // Name validation (only alphabetic characters)
      const nameRegex = /^[A-Za-z]+$/;
      if (!nameRegex.test(newMember.firstName)) {
        newErrors.firstName = 'First name must contain only alphabetic characters.';
        valid = false;
      }
      if (newMember.lastName && !nameRegex.test(newMember.lastName)) {
        newErrors.lastName = 'Last name must contain only alphabetic characters.';
        valid = false;
      }
  
      // Email validation (correct format)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newMember.email)) {
        newErrors.email = 'Please enter a valid email address.';
        valid = false;
      }
      // Student number validation (numeric)
      const studentNumRegex = /^\d{8}$/; // Regex for 8-digit numeric student numbers
      if (!studentNumRegex.test(newMember.studentnum)) {
        newErrors.studentnum = 'Student number must be an 8-digit number.';
        valid = false;
      }
  
      setErrors(newErrors);
      return valid;
    };
  
    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (validateForm()) {
          // If last name is optional, you may want to treat it accordingly
          const fullName = newMember.lastName ? `${newMember.firstName} ${newMember.lastName}` : newMember.firstName;
          
          const newMemberData = {
            ...newMember,
            name: fullName,  // Combine firstName and lastName, if present
          };
      // const fullName = `${newMember.firstName} ${newMember.lastName}`;
    
      // const newMemberData = {
      //   ...newMember,
      //   // name: fullName,  // Combine firstName and lastName
      // };
      // backend code 
      // onSubmit();
      onSubmit(newMemberData); 
      onClose(); // Close modal after submission
      }
    };
  
    if (!isVisible) return null;
  
    return (
      <div style={styles.modalOverlay as React.CSSProperties}>
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
                {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
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
                {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
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
                 {errors.studentnum && <p style={{ color: 'red' }}>{errors.studentnum}</p>} {/* Render the error message */}
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
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
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
                <label>Gender</label>
                <select
                  name="gender"
                  value={newMember.gender}
                  onChange={handleChange}
                  required
                  style={styles.modalInput}
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
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
  export default Modal;
