import React,{ useEffect,useState } from 'react';
import WorkoutInfo from '../components/workoutInfo';

const Workout = () => {

    const [day, setDay] = useState('sunday');
    //const [workout, setWorkouts] = useState({}) //empty object for now

    return (
        <div>
       <div className="dayOfWeekSelect" >
            <select onChange={(e) => setDay(e.target.value)}>
                <option  value='sunday'>
                    sunday
                </option>
                <option  value='monday'>
                    monday
                </option>
                <option value='tuesday'>
                    tuesday
                </option>
                <option  value='wednesday'>
                    wednesday
                </option>
                <option value='thursday'>
                    thursday
                </option>
                <option  value='friday'>
                    friday
                </option>
                <option  value='saturday'>
                    saturday
                </option>
            </select>
       </div>

       <div>
        <WorkoutInfo day = {day}/>
       </div>
       </div>
    );
}

export default Workout;