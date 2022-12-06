import React, {useState, useEffect} from "react";

function Students(id) {
    const [students, setStudents] = useState([])

    const fetchStudents = async () => {
      fetch(`/getStudents/${id}`).then(res => {
          if(res.ok) {
              return res.json()
          }
        }).then(jsonRes => setStudents(jsonRes))
    }

    useEffect(() => {
      fetchStudents();
    }, [id]);
    
    return (
        <div className="Students enrolled in this session" >
             {
                 students ? (
                     <p> {students} </p>
                 ) : (
                     <p>There are no students in this session</p>
                 )
             }
        </div>
     );
    //return students;
};


export default Students;