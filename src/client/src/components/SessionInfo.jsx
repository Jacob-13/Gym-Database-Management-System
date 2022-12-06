import React, {useState, useEffect} from "react";

function Classes() {
    const [classes, setClasses] = useState([])

    const fetchClasses = async () => {
      fetch("/classInfo/").then(res => {
          if(res.ok) {
              return res.json()
          }
        }).then(jsonRes => setClasses(jsonRes))
    }

    useEffect(() => {
      fetchClasses();
      console.log(classes)
    }, []);

    //return classes;
    //return classes.slice(0,4); //limit to 4

    //offering.count(so.accountID)
    //{offering['count(so.accountID)']} you think this would work?

    // accountID is undefined

    //gotcha! did that work?

    //can u try that? {offering['count(so.accountID)']}


    
    //offeringID, instructorID, instructorName, instructorEmail, studentCOUNT
    return (
      <div className="memberInfo" >
           <ol>
           {
               classes?.length > 0
                   ? (
                       classes.map((offering, index) => (
                           <li key={index}>
                               <h5>Class {index + 1}</h5>
                               
                               {offering.offeringID}
                               {offering.instructorID}
                               {offering.name}
                               {offering.email}
                               {offering['count(so.accountID)']}
                               
                           </li>
                       ))
                   ) : (
                       <p>No session found</p>
                   )
           }
           </ol>
      </div>
       

   );

  };

export default Classes;