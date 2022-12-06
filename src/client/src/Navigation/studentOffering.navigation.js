import React,{ useEffect,useState } from 'react';
import StudentOffering from '../components/StudentOffering';

const StudentOfferings = () => {

    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState('00-4351238');

    /*
    const fetchStudents = async () => {
        fetch('/getStudents/').then(res => {
            if(res.ok) {
                return res.json()
            }
          }).then(jsonRes => setStudents(jsonRes))
      }
  
      useEffect(() => {
        fetchStudents();
      }, []);*/

    return (
       <div className="studentsInSession" >
            <h1>Please Select a Session offering ID</h1>
            <div>
                <select onChange={(e) => setStudent(e.target.value)}>
                {
                    students?.length > 0
                        ? (
                            students.map((student, index) => (
                                <option key={index} value={student}>
                                    {student}
                                </option>
                            ))
                        ) : (
                            <p>There are no students in this session</p>
                        )
                }
                </select>
            </div>

            <div>

                <h2 id="weightHeader">Session Info</h2>
                <StudentOffering id = {student}/>

            </div>
       </div>
    );
}

export default StudentOfferings;