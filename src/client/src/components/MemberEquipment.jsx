import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const MemberEquipment = ({id}) => {
    
    const [equipment, setEquipment] = useState([]);

    const getMemberInfo = async (account_id) => {
        fetch("/api/equipment/" + account_id)
            .then(res => res.json())
            .then(data => {
                setEquipment(data);
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
                equipment?.length > 0
                    ? (
                        equipment.map((equipment, index) => (
                            <li key={index} value={equipment}>
                                <h5>{equipment.name}</h5>
                                <div>
                                    Weight: {equipment.weight}
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>This member has not used any equipment yet</p>
                    )
            }
            </ol>
       </div>
        

    );

}

export default MemberEquipment;