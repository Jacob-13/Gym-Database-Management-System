import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const MemberOfferings = ({id}) => {
    
    const [offerings, setOfferings] = useState([]);

    const getMemberInfo = async (account_id) => {
        fetch("/api/offerings/" + account_id)
            .then(res => res.json())
            .then(data => {
                setOfferings(data);
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
                offerings?.length > 0
                    ? (
                        offerings.map((offering, index) => (
                            <li key={index} value={offering}>
                                <h5>Offering {index + 1}</h5>
                                <div>
                                    ID: {offering.offeringID}
                                </div>
                                <div>
                                    Date: {offering.date}
                                </div>
                                <div>
                                    Time: {offering.time}
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>This member has not signed up for any offerings</p>
                    )
            }
            </ol>
       </div>
        

    );

}

export default MemberOfferings;