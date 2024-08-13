import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const RegularMemberInfo = ({attendanceThreshold}) => {
    
    const [regularInfo, setRegularInfo] = useState([]);

    const getRegularMemberInfo = async (attendanceThreshold) => {
        fetch("/api/workout/daily/" + attendanceThreshold)
            .then(res => res.json())
            .then(data => {
                setRegularInfo(data);
                console.log(data)
            });
    }

    useEffect(() => {
        getRegularMemberInfo(attendanceThreshold);
    }, [attendanceThreshold]);

    return (
       <div className="regularInfo" >
           <div>
            <table>
                <tr><th>Gym Address</th><th>Number of Regulars</th></tr>
            <tr>
                <td>
            {regularInfo.map((regular) => (
               <tr>
               <td>
                    {regular.address}
                </td>
                </tr>
            ))}
            </td>
            <td>
            {regularInfo.map((regular) => (
                <tr>
                <td>
                    {regular.numberOfRegularCustomers}
                </td>
                </tr>
            ))}
            </td>
            </tr>
             </table>
        </div>
    </div>
    );

}

export default RegularMemberInfo;

/**
 * return (
       <div className="regularInfo" >
           <div>
            <h2 id = "gymAddress"> Gym Address </h2>
            {regularInfo.map((regular) => (
                <div>
                    {regular.address}
                </div>
            ))}

            <h2 id = "regularCount"> Number of Regulars </h2>
            {regularInfo.map((regular) => (
                <div>
                    {regular.numberOfRegularCustomers}
                </div>
            ))}
             
        </div>
    </div>
    );
 * 
 * 
 * 
 */