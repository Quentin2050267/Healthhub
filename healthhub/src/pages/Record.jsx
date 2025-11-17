import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import { parse, unparse } from 'papaparse';
import '../styles/Record.css';
import { FaDownload, FaTrashAlt, FaFileExport, FaFileImport } from 'react-icons/fa'; // Import Font Awesome icons

Modal.setAppElement('#root');

const GRAPHQL_ENDpoint = process.env.REACT_APP_GRAPHQL_ENDpoint || 'http://localhost:3001/graphql';

/**
 * graphQLFetch function
 * Fetches data from the GraphQL endpoint.
 * @param {string} query - The GraphQL query string.
 * @param {object} variables - The variables for the GraphQL query.
 * @returns {object} - The fetched data.
 */
async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch(GRAPHQL_ENDpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const body = await response.text();
    const result = JSON.parse(body);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.exception.errors) {
        const details = error.extensions.exception.errors.join('\n');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}

/**
 * Record component
 * This component renders the patient record manager, including functionalities for adding, searching, importing, and exporting records.
 */
function Record() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState('');
  const [formData, setFormData] = useState({
    diseaseName: '',
    symptoms: '',
    medications: '',
    duration: '',
    hospital: '',
    clinic: ''
  });

  const storedUser = localStorage.getItem('user');
  const userEm = storedUser ? JSON.parse(storedUser).email : null;

  useEffect(() => {
    const fetchRecords = async () => {
      const query = `
        query {
          records {
            _id
            userEm
            Disease
            Symptoms
            Medications
            Duration
            Hospital
            Clinic
          }
        }
      `;
      const variables = { userEm };
      const data = await graphQLFetch(query, variables);
      if (data && data.records) {
        setRecords(data.records);
      }
    };
    if (userEm) {
      fetchRecords();
    }
  }, [userEm]); // Add userEm as a dependency

  const filteredRecords = records.filter(record =>
    record.Disease.toLowerCase().includes(filter.toLowerCase())
    && record.userEm === userEm
  );

  /**
   * handleChange function
   * Handles changes to the input fields in the form.
   * @param {object} e - The event object.
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * handleFilterChange function
   * Handles changes to the search filter input.
   * @param {object} event - The event object.
   */
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  /**
   * handleSubmit function
   * Handles the submission of the form to add a new record.
   * @param {object} e - The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const mutation = `
      mutation ($input: RecordInput!) {
        addOneRecord(input: $input) {
          _id
          userEm
          Disease
          Symptoms
          Medications
          Duration
          Hospital
          Clinic
        }
      }
    `;

    const variables = {
      input: {
        userEm: userEm,
        Disease: formData.diseaseName,
        Symptoms: formData.symptoms,
        Medications: formData.medications,
        Duration: formData.duration,
        Hospital: formData.hospital,
        Clinic: formData.clinic,
      },
    };

    const data = await graphQLFetch(mutation, variables);
    if (data && data.addOneRecord) {
      setRecords([...records, data.addOneRecord]);
      alert('Successfully added 1 record.');
      setModalIsOpen(false);
      setFormData({
        diseaseName: '',
        symptoms: '',
        medications: '',
        duration: '',
        hospital: '',
        clinic: ''
      });
    }
  };

  const fileInputRef = useRef(null);

  /**
   * handleImport function
   * Handles the import of records from a CSV file.
   * @param {object} event - The event object.
   */
  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    parse(file, {
      complete: async (results) => {
        const validRecords = results.data
          .filter(record => record.Disease && record.Disease.trim() !== '')
          .map(record => ({
            userEm: userEm,
            Disease: record.Disease,
            Symptoms: record.Symptoms,
            Medications: record.Medications,
            Duration: record.Duration,
            Hospital: record.Hospital,
            Clinic: record.Clinic
          }));

        const mutation = `
          mutation ($input: [RecordInput!]!) {
            addRecords(input: $input) {
              _id
              Disease
              Symptoms
              Medications
              Duration
              Hospital
              Clinic
            }
          }
        `;

        const variables = { input: validRecords };
        const data = await graphQLFetch(mutation, variables);
        if (data && data.addRecords) {
          setRecords([...records, ...data.addRecords]);
          alert(`Successfully imported ${validRecords.length} records.`);
        }

        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      },
      header: true,
      skipEmptyLines: true
    });
  };

  /**
   * handleDelete function
   * Handles the deletion of a record.
   * @param {string} id - The ID of the record to delete.
   */
  const handleDelete = async (id) => {
    const mutation = `
      mutation ($id: ID!) {
        deleteRecord(id: $id)
      }
    `;

    const variables = { id };
    const data = await graphQLFetch(mutation, variables);
    if (data && data.deleteRecord) {
      setRecords(records.filter(record => record._id !== id));
      alert('Successfully deleted the record.');
    }
  };

  const exampleData = [
    { Disease: "Flu", Symptoms: "Fever", Medications: "Tamiflu", Duration: "7", Hospital: "General Hospital", Clinic: "Family Clinic" },
    { Disease: "Allergies", Symptoms: "Sneezing", Medications: "Antihistamines", Duration: "30", Hospital: "Allergy Center", Clinic: "Allergy Clinic" }
  ];

  /**
   * handleDownloadTemplate function
   * Handles the download of the CSV template for importing records.
   */
  const handleDownloadTemplate = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Disease,Symptoms,Medications,Duration,Hospital,Clinic\n";
    exampleData.forEach(row => {
      csvContent += Object.values(row).join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "patient_record_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /**
   * handleExport function
   * Handles the export of records to a CSV file.
   */
  const handleExport = () => {
    const recordsToExport = filteredRecords.map(({ _id, userEm, ...rest }) => rest);
    const csv = unparse(recordsToExport);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "patient_records.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /**
   * handleResetSearch function
   * Resets the search filter.
   */
  const handleResetSearch = () => {
    setFilter('');
  };

  return (
    <div className="container">
      <h1 className="text-4xl font-bold mb-8">Patient Record Manager</h1>
      <div className="search-container">
        <input type="search" value={filter} onChange={handleFilterChange} placeholder="Search by disease..." />
        <button className="btn btn-secondary" onClick={handleResetSearch}>Reset Search</button>
        <button className="btn btn-primary" onClick={() => setModalIsOpen(true)}>Add Record</button>
      </div>
      <div className="import-container">
        <input
          type="file"
          id="fileInput"
          onChange={handleImport}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <div className="download-icon-container" onClick={handleDownloadTemplate}>
          <FaDownload className="download-icon" />
          <span className="tooltip-text">Download Template</span>
        </div>
        <div className="download-icon-container" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
          <FaFileImport className="download-icon" />
          <span className="tooltip-text">Import Records</span>
        </div>
        <div className="download-icon-container" onClick={handleExport}>
          <FaFileExport className="download-icon" />
          <span className="tooltip-text">Export Records</span>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Disease</th>
            <th>Symptoms</th>
            <th>Medications</th>
            <th>Duration</th>
            <th>Hospital</th>
            <th>Clinic</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
           {/* Add the following block */}
          {filteredRecords.length === 0 && (
            <div className="no-records">
              <p className="text-center text-lg text-gray-500">
                Feel free to add your first record! 😊
              </p>
            </div>
          )}
          {filteredRecords.map((record) => (
            <tr key={record._id}>
              <td>{record.Disease}</td>
              <td>{record.Symptoms}</td>
              <td>{record.Medications}</td>
              <td>{record.Duration}</td>
              <td>{record.Hospital}</td>
              <td>{record.Clinic}</td>
              <td>
                <div className="icon-container" onClick={() => handleDelete(record._id)}>
                  <FaTrashAlt className="delete-icon" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Record Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <form onSubmit={handleSubmit}>
          <label>Disease Name:</label>
          <input type="text" name="diseaseName" value={formData.diseaseName} onChange={handleChange} required />
          <label>Symptoms:</label>
          <input type="text" name="symptoms" value={formData.symptoms} onChange={handleChange} required />
          <label>Medications:</label>
          <input type="text" name="medications" value={formData.medications} onChange={handleChange} required />
          <label>Duration (days):</label>
          <input type="number" name="duration" value={formData.duration} onChange={handleChange} required />
          <label>Hospital:</label>
          <input type="text" name="hospital" value={formData.hospital} onChange={handleChange} required />
          <label>Clinic:</label>
          <input type="text" name="clinic" value={formData.clinic} onChange={handleChange} required />
          <div className="modal-buttons">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button onClick={() => setModalIsOpen(false)} className="btn btn-secondary">Close</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Record;