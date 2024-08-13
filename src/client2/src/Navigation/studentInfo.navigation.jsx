import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import MemberInfo from '../components/MemberInfo';
import MemberPrevWeight from '../components/MemberPrevWeight';

const home = () => {
    
    const [members, setMembers] = useState([]);
    const [member, setMember] = useState('18-8223619');

    const getStudents = () => {
        fetch("api/students")
            .then(res => res.json())
            .then(students => {
                setMembers(students);
            })
    }

    useEffect(() => {
        getStudents();
    }, [])

    return (
       <div className="memberSelect">
            <h1>Please Select a Member Account ID</h1>
            <div>
                <select onChange={(e) => setMember(e.target.value)}>Account ids
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
                <MemberInfo id = {member}/>
                <MemberPrevWeight id = {member}/>
                
            </div>
       </div>
    );
}

export default home;