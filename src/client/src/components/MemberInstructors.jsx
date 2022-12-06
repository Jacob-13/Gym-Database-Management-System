import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const MemberInstructors = ({id}) => {
    
    const [instructors, setInstructors] = useState([]);

    const getMemberInfo = async (account_id) => {
        fetch("/api/instructors/" + account_id)
            .then(res => res.json())
            .then(data => {
                setInstructors(data);
            });
    }

    useEffect(() => {
        getMemberInfo(id);
    }, [id]);

    /* 
        Might need to select the sessionTitle prop from the data, otherwise should be ok
    */

    return (
       <div className="memberInfo" >
            <ol>
            {
                instructors?.length > 0
                    ? (
                        instructors.map((instructor, index) => (
                            <li key={index} value={instructor}>
                                <h5>Instructor {index + 1}</h5>
                                <div>
                                    Instructor Name: {instructor.name}
                                </div>
                                <div>
                                    Instructor Email: {instructor.email}
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>There are no instructors associated with this account</p>
                    )
            }
            </ol>
       </div>
        

    );

}

export default MemberInstructors;