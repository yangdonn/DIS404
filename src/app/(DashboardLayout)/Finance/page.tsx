"use client";
import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiSearch, FiPlus } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import piechart from "../../(DashboardLayout)/components/dashboard/piechart";
import "react-toastify/dist/ReactToastify.css";
import { FiDollarSign, FiArrowUp, FiArrowDown } from "react-icons/fi";
import "../Finance/finance.css";

const FinanceDashboard = () => {
  const [records, setRecords] = useState([
    {
      id: 1,
      date: "2024-01-15",
      description: "Grocery Shopping",
      amount: 100,
      category: "Expenses",
      notes: "Monthly groceries",
    },
    {
      id: 2,
      date: "2024-01-14",
      description: "Salary Deposit",
      amount: 5000,
      category: "Income",
      notes: "Monthly salary",
    },
  ]);

  const [formData, setFormData] = useState({
    date: "",
    description: "",
    amount: "",
    category: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const recordsPerPage = 10;
  const categories = ["Income", "Expenses", "Funded"];

  //   Calculate totals for summary cards
  const totalIncome = records
    .filter(
      (record) => record.category === "Income" || record.category === "Funded"
    )
    .reduce((sum, record) => sum + Number(record.amount), 0);

  const totalExpenses = records
    .filter((record) => record.category === "Expenses")
    .reduce((sum, record) => sum + Number(record.amount), 0);

  const currentBudget = totalIncome - totalExpenses;

  const validateForm = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.amount || isNaN(formData.amount))
      newErrors.amount = "Valid amount is required";
    if (!formData.category) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      const newRecord = {
        ...formData,
        id: Date.now(),
        amount: parseFloat(formData.amount),
      }; // Parse amount as a number
      if (isEditing) {
        // Update the record if editing
        setRecords(
          records.map((record) =>
            record.id === editId ? { ...newRecord, id: editId } : record
          )
        );
        toast.success("Record updated successfully!");
      } else {
        // Add a new record
        setRecords((prevRecords) => [...prevRecords, newRecord]);
        toast.success("Record added successfully!");
      }
      resetForm();
      setIsLoading(false);
    }, 1000);
  };

  const resetForm = () => {
    setFormData({
      date: "",
      description: "",
      amount: "",
      category: "",
      notes: "",
    });
    setErrors({});
    setIsEditing(false);
    setEditId(null);
    setShowModal(false);
  };

  const handleEdit = (record) => {
    setFormData(record);
    setIsEditing(true);
    setEditId(record.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setIsLoading(true);
      setTimeout(() => {
        setRecords(records.filter((record) => record.id !== id));
        toast.success("Record deleted successfully!");
        setIsLoading(false);
      }, 500);
    }
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const sortedRecords = [...records].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    if (sortConfig.direction === "asc") {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const filteredRecords = sortedRecords.filter((record) =>
    Object.values(record).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  return (
    <div className="finance-dashboard">
      <div className="container">
        <div className="card">
          <h1 className="title">Finance Dashboard</h1>

          {/* Summary Cards */}
          <div className="summary-cards">
            <div className="card total-income-card">
              <div className="card-header">
                <p className="card-title">Total Income</p>
                <p className="card-amount">Nu. {totalIncome}</p>
              </div>
              <FiArrowUp style={{ fontSize: "1rem" }} />
            </div>

            <div className="card total-expenses-card">
              <div className="card-header">
                <p className="card-title">Total Expenses</p>
                <p className="card-amount">Nu. {totalExpenses}</p>
              </div>
              <FiArrowDown style={{ fontSize: "1rem" }} />
            </div>

            <div className="card total-income-card">
              <div className="card-header">
                <p className="card-title">Current Budget</p>
                <p className="card-amount">Nu. {currentBudget}</p>
              </div>
            </div>
          </div>

          {/* Search Box */}

          <div className="search-and-add">
            <div className="search-input">
              <FiSearch className="search-icon" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search records..."
              />
            </div>
            {/* Add Record Button */}
            <div className="addbutton" onClick={() => setShowModal(true)}>
              <FiPlus /> Add Record
            </div>
          </div>

          {/* Records Table */}
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSort("date")}>Date</th>
                  <th onClick={() => handleSort("description")}>
                    Event Description
                  </th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((record) => (
                  <tr key={record.id}>
                    <td>{record.date}</td>
                    <td>{record.description}</td>
                    <td>
                      Nu{" "}
                      {Number.isFinite(record.amount)
                        ? record.amount.toFixed(2)
                        : "0.00"}
                    </td>
                    <td>{record.category}</td>
                    <td>{record.notes}</td>
                    <td>
                      <button onClick={() => handleEdit(record)}>
                        <FiEdit2
                          style={{ fontSize: "1rem", color: "#779aff" }}
                        />
                      </button>
                      <button onClick={() => handleDelete(record.id)}>
                        <FiTrash2 style={{ fontSize: "1rem", color: "red" }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Prev
            </button>
            <span>{currentPage}</span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Adding and Editing Records */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{isEditing ? "Edit Record" : "Add Record"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Date:</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
                {errors.date && <span>{errors.date}</span>}
              </div>
              <div className="form-group">
                <label>Event Description:</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                />
                {errors.description && <span>{errors.description}</span>}
              </div>
              <div className="form-group">
                <label>Amount:</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                />
                {errors.amount && <span>{errors.amount}</span>}
              </div>
              <div className="form-group">
                <label>Category:</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && <span>{errors.category}</span>}
              </div>
              <div className="form-group">
                <label>Notes:</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="form-actions">
                <button type="submit" disabled={isLoading}>
                  {isLoading
                    ? "Saving..."
                    : isEditing
                    ? "Save Changes"
                    : "Add Record"}
                </button>
                <button type="button" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default FinanceDashboard;
