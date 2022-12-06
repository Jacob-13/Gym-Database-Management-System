import React,{ useEffect,useState } from 'react';
import RegularMemberInfo from '../components/regularMember'

const RegularMembers = () => {

    const [attendanceThreshold, setAttendanceThreshold] = useState([]);
    const [regular, setRegulars] = useState([]);

    const getRegulars = (attendanceThreshold) => {
        fetch("/api/workout/daily/" + attendanceThreshold)
            .then(res => res.json())
            .then(regulars => {
                setRegulars(regulars);
            })
    }

    useEffect(() => {
        getRegulars(attendanceThreshold);
    }, [])

    return (
        <div className="regularFind" >
            <h1>Please Select a Visit Frequency Threshold to define "regulars"</h1>
            <div>
                <select onChange={(e) => setAttendanceThreshold(e.target.value)}>
                    <option  value="12">
                        12 days/month
                    </option>
                    <option  value='14'>
                        14 days/month
                    </option>
                    <option value='16'>
                        16 days/month
                    </option>
                    <option  value='18'>
                        18 days/month
                    </option>
                    <option value='20'>
                        20 days/month
                    </option>
                    <option  value='22'>
                        22 days/month
                    </option>
                    <option  value='24'>
                        24 days/month
                    </option>
                </select>
            </div>
 
            <div>
        <RegularMemberInfo attendanceThreshold = {attendanceThreshold}/>
        </div>
        </div>
     );
 }
 
 export default RegularMembers;