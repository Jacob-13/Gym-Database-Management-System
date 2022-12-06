import React, { useState } from 'react';

const Instructor = () => {
  const BASE_URL = 'https://localhost:5000';
  const [instructors, setInstructors] = useState([]);

  const fetchInstructors = async (skillLevel) => {
    const response = await fetch(`/api/${skillLevel}`);
    const instructors = await response.json();
    setInstructors(instructors);
  };

  return (
    <div>
      <button onClick={() => fetchInstructors('high')}>
        Get High Skill Level Instructors
      </button>
      <button onClick={() => fetchInstructors('medium')}>
        Get Medium Skill Level Instructors
      </button>
      <button onClick={() => fetchInstructors('low')}>
        Get Low Skill Level Instructors
      </button>
      <ul>
        {instructors.map((instructor) => (
          <li key={instructor.instructorID}>{instructor.name}: {instructor.instructorID}</li>
        ))}
      </ul>
    </div>
  );
};

export default Instructor;