import React,{ useEffect,useState } from 'react';
import MemberInfo from '../components/MemberInfo';
import MemberPrevWeight from '../components/MemberPrevWeight';
import MemberSessions from '../components/MemberSessions';
import MemberOfferings from '../components/MemberOfferings';
import MemberInstructors from '../components/MemberInstructors';
import MemberEquipment from '../components/MemberEquipment';

const StudentInfo = () => {

    const [members, setMembers] = useState([]);
    const [member, setMember] = useState('00-4351238');

    const getStudents = () => {
        fetch("/api/students")
            .then(res => res.json())
            .then(students => {
                setMembers(students);
            })
    }

    useEffect(() => {
        getStudents();
    }, [])

    return (
       <div className="memberSelect" >
            <h1>Please Select a Member Account ID</h1>
            <div>
                <select onChange={(e) => setMember(e.target.value)}>
                {
                    members?.length > 0
                        ? (
                            members.map((member, index) => (
                                <option key={index} value={member}>
                                    {member}
                                </option>
                            ))
                        ) : (
                            <p>There are no students</p>
                        )
                }
                </select>
            </div>

            <div>

                <h2 id="weightHeader">Current Weight</h2>
                <MemberInfo id = {member}/>

                <h2>Last Recorded Weight</h2>
                <MemberPrevWeight id = {member}/>

                <h2>Sessions</h2>
                <MemberSessions id = {member} />

                <h2>Offerings</h2>
                <MemberOfferings id = {member} />

                <h2>Instructors</h2>
                <MemberInstructors id = {member} />

                <h2>Equipment Used</h2>
                <MemberEquipment id = {member} />
            </div>
       </div>
    );
}

export default StudentInfo;