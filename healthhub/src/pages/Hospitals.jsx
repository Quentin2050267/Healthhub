import React, { useState, useEffect, useRef } from 'react';
import DepartmentCarousel from '../components/Carousel';
import SearchBox from '../components/SearchBox';
import '../styles/Hospitals.css';
import { Link } from "react-router-dom";
import { FaStethoscope, FaSyringe, FaBone, FaChild, FaFemale, FaEye, FaBrain, FaHeart, FaTooth, FaMale, FaRegSadCry } from 'react-icons/fa';
import { GiNoseFront, GiTumor, GiGrass } from 'react-icons/gi';
import { AiOutlineSkin } from 'react-icons/ai';
import { LuMilk } from "react-icons/lu";

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

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
      body: JSON.stringify({ query, variables })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.exception.errors) {
        const details = error.extensions.exception.errors.join('\n ');
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

const departments = [
  { name_zh: '内科', name_en: 'Internal Medicine', icon: <FaStethoscope /> },
  { name_zh: '外科', name_en: 'Surgery', icon: <FaSyringe /> },
  { name_zh: '骨科', name_en: 'Orthopedics', icon: <FaBone /> },
  { name_zh: '儿科', name_en: 'Pediatrics', icon: <FaChild /> },
  { name_zh: '妇产科', name_en: 'Obstetrics & Gynecology', icon: <FaFemale /> },
  { name_zh: '眼科', name_en: 'Ophthalmology', icon: <FaEye /> },
  { name_zh: '耳鼻咽喉头颈科', name_en: 'Otorhinolaryngology', icon: <GiNoseFront /> },
  { name_zh: '皮肤性病科', name_en: 'Dermatology & Venereology', icon: <AiOutlineSkin /> },
  { name_zh: '精神科', name_en: 'Psychiatry', icon: <FaBrain /> },
  { name_zh: '口腔科', name_en: 'Dentistry', icon: <FaTooth /> },
  { name_zh: '男科', name_en: 'Andrology', icon: <FaMale /> },
  { name_zh: '肿瘤科', name_en: 'Oncology', icon: <GiTumor /> },
  { name_zh: '中医科', name_en: 'Traditional Chinese Medicine', icon: <GiGrass /> },
  { name_zh: '麻醉科', name_en: 'Anesthesiology', icon: <FaSyringe /> },
  { name_zh: '疼痛科', name_en: 'Pain Management', icon: <FaRegSadCry /> },
  { name_zh: '营养科', name_en: 'Nutrition', icon: <LuMilk /> },
];

/**
 * Hospitals component
 * This component renders the hospitals page, including a department carousel, search box, and list of hospitals.
 */
const Hospitals = () => {
  const [hospitalsByDept, setHospitalsByDept] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const departmentRefs = useRef(departments.map(() => React.createRef()));

  /**
   * fetchAllHospitals function
   * Fetches all hospitals from the GraphQL endpoint and groups them by department.
   */
  const fetchAllHospitals = async () => {
    const gqlQueryAll = `
      query {
        getAllHospitals {
          _id
          name
          address_zh
          address_en
          phone
          intro
          departments_zh
          departments_en
          img_url
        }
      }
    `;

    const data = await graphQLFetch(gqlQueryAll);

    if (data && data.getAllHospitals) {
      const hospitalsByDept = {};
      data.getAllHospitals.forEach(hospital => {
        hospital.departments_zh.forEach(dept => {
          if (dept !== "") {
            if (!hospitalsByDept[dept]) {
              hospitalsByDept[dept] = [];
            }
            hospitalsByDept[dept].push(hospital);
          }
        });
      });
      setHospitalsByDept(hospitalsByDept);
      console.log(hospitalsByDept);
    }
  };

  useEffect(() => {
    fetchAllHospitals();
  }, []);

  /**
   * handleDepartmentClick function
   * Handles the click event on a department card and scrolls to the corresponding section.
   * @param {number} index - The index of the clicked department.
   */
  const handleDepartmentClick = async (index) => {
    if (departmentRefs.current[index].current) {
      departmentRefs.current[index].current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /**
   * handleReset function
   * Resets the search query and fetches all hospitals.
   */
  const handleReset = () => {
    setSearchQuery('');
    fetchAllHospitals();
  };

  /**
   * handleSearch function
   * Handles the search functionality for hospitals.
   * @param {string} query - The search query.
   */
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      fetchAllHospitals();
      return;
    }

    const gqlQuery = `
      query ($name: String!) {
        hospitalsByName(name: $name) {
          _id
          name
          address_zh
          address_en
          phone
          intro
          departments_zh
          departments_en
          img_url
        }
      }
    `;

    const data = await graphQLFetch(gqlQuery, { name: query });
    if (data && data.hospitalsByName) {
      const hospitalsByDept = {};
      data.hospitalsByName.forEach(hospital => {
        hospital.departments_zh.forEach(dept => {
          if (dept !== "") {
            if (!hospitalsByDept[dept]) {
              hospitalsByDept[dept] = [];
            }
            hospitalsByDept[dept].push(hospital);
          }
        });
      });
      setHospitalsByDept(hospitalsByDept);
    }
  };

  return (
    <div className="hospitals-container">
      <h1 className="text-4xl font-bold mb-8">Find Your Hospital</h1>
      <DepartmentCarousel departments={departments} onDepartmentClick={handleDepartmentClick} />
      <SearchBox onSearch={handleSearch} onReset={handleReset} />
      <div className="hospital-list">
        {departments.map((department, deptIndex) => {
          const actualHospitals = hospitalsByDept[department.name_zh] || [];
          return (
            <div key={deptIndex} className="department-section" ref={departmentRefs.current[deptIndex]}>
              {deptIndex !== 0 && <hr />}
              <h2 className="department-title">
                <span className='department-icon'>{department.icon}</span>
                {department.name_en}
              </h2>
              <div className="hospital-cards-container">
                {actualHospitals.map((hospital) => (
                  <Link
                    key={hospital._id}
                    className="hospital-card"
                    to={`/hospital/${hospital._id}/`}
                    state={{ hospitalProp: hospital }}
                  >
                    <h2 className="hospital-name">{hospital.name}</h2>
                    <p className="hospital-address"><strong>Location:</strong> {hospital.address_en}</p>
                    <p className="hospital-phone"><strong>Phone:</strong> {hospital.phone}</p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hospitals;