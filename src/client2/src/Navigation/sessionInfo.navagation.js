import React,{ useEffect,useState } from 'react';
import SessionInfo from '../Components/SessionInfo';

const SessionInformation = () => {

    const [classes, setClasses] = useState([]);
    const [offering, setClass] = useState('');

    const fetchClasses = async () => {
        fetch("/classInfo/").then(res => {
            if(res.ok) {
                return res.json()
            }
          }).then(jsonRes => setClasses(jsonRes))
      }


      useEffect(() => {
        fetchClasses();
      }, []);

    return (
       <div className="sessionSelect" >
            <h1>Please Select a Session offering ID</h1>
            <div>
                
                {
                    classes?.length > 0
                        ? (
                            classes.map((offering, index) => (
                                <li key={index} value={offering}>
                                    <div>
                                        ID: {offering.offeringID}
                                    </div>
                                    <div>
                                        instructor ID: {offering.indstructorID}
                                    </div>
                                    <div>
                                        instructor name: {offering.name}
                                    </div>
                                    <div>
                                        instructor email: {offering.email}
                                    </div>
                                    <div>
                                        count: {offering['count(so.accountID)']}
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>There are no sessions</p>
                        )
                }
                
            </div>

       </div>
    );
}

export default SessionInformation;