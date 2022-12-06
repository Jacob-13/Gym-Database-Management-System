import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const MemberPrevWeight = ({id}) => {
    
    const [member, setMember] = useState([]);

    const getMemberInfo = async (account_id) => {
        fetch("/api/prevWeight/" + account_id)
            .then(res => res.json())
            .then(data => {
                setMember(data);
            });
    }

    useEffect(() => {
        getMemberInfo(id);
    }, [id]);

    return (
       <div className="memberInfo" >
            {
                member ? (
                    <p> {member} </p>
                ) : (
                    <p>There are no members with this ID</p>
                )
            }
       </div>
        

    );

}

export default MemberPrevWeight;