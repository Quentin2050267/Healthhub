import React from 'react';
import '../styles/DepartmentCarousel.css'; // Import styles

/**
 * DepartmentCarousel component
 * This component renders a carousel of department cards.
 * Each card displays an icon and the department name in English.
 * Clicking on a card triggers the onDepartmentClick function with the index of the clicked card.
 * @param {array} departments - Array of department objects containing icon and name_en.
 * @param {function} onDepartmentClick - Function to call when a department card is clicked.
 */
const DepartmentCarousel = ({ departments, onDepartmentClick }) => {
    return (
        <div className="carousel">
            {departments.map((dept, index) => (
                <div
                    key={index}
                    className="card"
                    onClick={() => onDepartmentClick(index)}
                >
                    <div className="icon">{dept.icon}</div>
                    <p>{dept.name_en}</p>
                </div>
            ))}
        </div>
    );
};

export default DepartmentCarousel;