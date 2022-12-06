import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const WorkoutInfo = ({day}) => {
    
    const [workouts, setWorkouts] = useState([]);

    const getWorkoutInfo = async (days) => {
        fetch("/api/workout/" + days)
            .then(res => res.json())
            .then(data => {
                setWorkouts(data);
                console.log(data);
            });
    }

    useEffect(() => {
        getWorkoutInfo(day);
    }, [day]);

    return (
        <div className="WorkoutInfo" >
                <div>
                    <table>
                        <tr><th>Account ID</th><th>Date</th><th>Sign In Time</th><th>Sign Out Time</th><th>Length of Workout in Minutes</th></tr>
                   
    <tr>
        
        <td class = "odd"><table>
                    {workouts.map((workout) => (
                        <tr>
                        <td>
                            {workout.accountID} 
                        </td>
                        </tr>
                    ))}
       </table>   </td>
          
          <td><table>
                    {workouts.map((workout) => (
                       <tr>
                       <td>
                            {workout.date} 
                        </td>
                        </tr>
                    ))}
  </table>      </td>
       
        <td class = "odd"> <table>
                    {workouts.map((workout) => (
                        <tr>
                        <td>
                            {workout.signInTime}
                        </td>
                        </tr>
                    ))}
       </table> </td>
        
        <td>  <table>
                    {workouts.map((workout) => (
                        <tr>
                        <td>
                            {workout.signOutTime}
                        </td>
                        </tr>
                    ))}
                 </table>    </td>
                     
        <td class = "odd"><table>
                    {workouts.map((workout) => (
                        <tr>
                        <td>
                            {workout.LengthOfWorkOutInMinutes}
                        </td>
                        </tr>
                    ))}
               </table>       </td>
                  
    </tr>
                    </table>


                </div>
            
           
            
        </div>
    );

}

export default WorkoutInfo;


/**
 * 
 * <div className="WorkoutInfo" >
            
                <div>
                    <h2 id = "accountID"> Account ID</h2>
                    {workouts.map((workout) => (
                        <div>
                            {workout.accountID} {workout.date}
                        </div>
                    ))}
        
                    <h2 id = "date"> Date </h2>
          
                    {workouts.map((workout) => (
                        <div>
                            {workout.date}
                        </div>
                    ))}
        
                    
                    <h2 id = "signInTime"> Sign In Time </h2>
                    {workouts.map((workout) => (
                        <div>
                            {workout.signInTime}
                        </div>
                    ))}
        
                    
                    <h2 id = "signOutTime"> Sign Out Time</h2>                    
                    {workouts.map((workout) => (
                        <div>
                            {workout.signOutTime}
                        </div>
                    ))}
                    
                    <h2 id = "LengthOfWorkoutInMinutes"> Length Of Workout</h2>
                    
                    
                    {workouts.map((workout) => (
                        <div>
                            {workout.LengthOfWorkoutInMinutes}
                        </div>
                    ))}

                </div>

 */