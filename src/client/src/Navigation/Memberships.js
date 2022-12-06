import React, { useState, useEffect } from "react";

function Membership(){
  // Declare a state variable called items and initialize it to an empty array
  const [items, setItems] = useState([]);


  // Use the useEffect hook to perform the API call when the component is rendered
  useEffect(() => {
    fetch("/api/students-2")
    .then(res => res.json())
    .then(data => {
      // Update the items state variable with the data fetched from the API
      setItems(data);
    })
  }, []);


  // Iterate over the items array and set the isExpired property if the membership has expired
  const isExpired = (expiryDate) => {
    if(getCurrentDate() <= expiryDate) return "This user's membership is expired!";
  }

  // Returns the current date in the format MM/DD/YYYY
  function getCurrentDate() {
    let todayDate ='';
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    todayDate = month+'/'+date+'/'+year;
    return todayDate;
  }

  // Renew the membership for the given user
  const renewMembership = (year, name) =>{
    // Parse the year from the year parameter
    let y = year.charAt(year.length-1);
    let day = year.substring(0,2);
    let month = year.substring(3,5);
    let newyear = year.substring(6,10);
    
    y = parseInt(y)
    y++;
    // Increment the year by 1
    newyear = newyear.replaceAt(3, `${y}`);

    // Show an alert with the new expiry date
    const newDate = day +"/"+  month+"/" + newyear;
    alert(newDate);

    let sql = `UPDATE student SET expiryDate = ${newDate} WHERE name = ${name}`
    // Make an API call to renew the membership
    fetch(`/api/renewMembership/`,{
        method: 'POST',
        body: sql
    });
    /*items.forEach(item => {
      if(item.name === name) item.expiryDate = newDate;

   });*/
    //useEffect();
  }

  // Add a replaceAt method to the String prototype
  String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
  }

 

  return(
    <div>
      <h1>Check and Renew Memberships</h1>
      {
        // Iterate over the items array and render the data for each item
        items.map((item) => (
          <ol>
            Account ID: { item.accountID }, 
            Full Name: { item.name }, 
            Email: { item.address } 
            Expiry date: {item.expiryDate}
            <b>{isExpired(item.expiryDate)}</b>
            <button onClick={() => renewMembership(item.expiryDate, item.name)}>
              Renew
            </button>
          </ol>
        ))
      }
    </div>
  )
}

export default Membership;