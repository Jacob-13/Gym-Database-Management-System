import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const MemberSessions = ({id}) => {
    
    const [sessions, setSessions] = useState([]);

    const getMemberInfo = async (account_id) => {
        fetch("/api/sessionTitles/" + account_id)
            .then(res => res.json())
            .then(data => {
                setSessions(data);
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
                sessions?.length > 0
                    ? (
                        sessions.map((session, index) => (
                            <li key={index} value={session}>
                                <h5>Session {index + 1}</h5>
                                {session}
                            </li>
                        ))
                    ) : (
                        <p>This member has not signed up for any sessions</p>
                    )
            }
            </ol>
       </div>
        

    );

}

export default MemberSessions;