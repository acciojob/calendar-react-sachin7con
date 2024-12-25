//SGN, ONS, JSLV, JSSR, JBB, JMD, JSRK, JSM, JSP
import React, {Component, useState} from "react";
import '../styles/App.css';
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


const App = () => {
      const [selectedMonth, setSelectedMonth] = useState(months[1]);
      const [year, setYear] = useState(new Date().getFullYear());
      const [isEditing, setIsEditing] = useState(false);

      const handleYearChange = (e) => {
            const intYear = parseInt(e.target.value, 10);
            if(intYear === !isNaN){
              setYear(intYear);
            }
            
      }

      const handleMonthChange = (e) => {
          setSelectedMonth(e.target.value);
      }

      // number of Days in given month 
      const noOfDays = (year, month) => {
          return new Date(year, month + 1, 0).getDate();
      }

      // renderDays 
      const renderDays = () => {
          const monthIndex = months.indexOf(selectedMonth);
          const totalDays = noOfDays(year, monthIndex); 
          const firstDay = new Date(year, monthIndex, 1).getDay();
          const days = [];
          for(let i=0; i<firstDay ; i++){
            days.push(<td key={`empty-${i}`}></td>);
          }
          
          for(let i=1; i<=totalDays; i++){
             days.push(<td key={i}>{i}</td>);
          }


          const rows = [];
          for(let i=0; i< days.length; i+=7){
            rows.push(<tr key={`row-${i}`}>{days.slice(i, i+7)}</tr>)
          }

          return rows;

      }

      
      // button functions 

      const handlePrevMonth =() => {
        const monthIndex = months.indexOf(selectedMonth);
        if(monthIndex === 0){
          setSelectedMonth(months[11]);
          setYear(year -1 );
        }else{
          setSelectedMonth(months[monthIndex -1])

        } }

        const handleNextMonth = () => {
          const monthIndex = months.indexOf(selectedMonth);
          if(monthIndex === 11){
            setSelectedMonth(months[0]);
            setYear(year + 1);
          }else{
            setSelectedMonth(months[monthIndex+1]);
          }
        }

        const handlePrevYear = () => {
          setYear(year - 1);
        }
        const handleNextYear = () => {
          setYear(year +1);
        }

  return (
    <div id="main">
      <h1>Calender</h1>

      {/* month year  */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <select value={selectedMonth} onChange={handleMonthChange} >
        {months.map((month, index) => {
          return( <option key={index} value={month} >{month}</option>)
        })}

      </select>
      {isEditing ? (<input type="number" onBlur={() => setIsEditing(false)} onChange={handleYearChange} /> ) : 
      (          <p
        onDoubleClick={() => setIsEditing(true)}
        style={{ cursor: "pointer", margin: 0 }}
      >{year}</p>)}
      </div>

      {/* days table  */}
      <hr /><br />
      <table gap="20px"
        style={{
          marginTop: "20px",
          borderCollapse: "collapse",
          textAlign: "left",
          
        }}
          >
        <thead>
        <tr>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => {
          return(
            <th key={index}>{day}</th>
          )
          
        })}</tr>

    </thead>
    <tbody>

      {renderDays() }

    </tbody>

      </table>
      <hr />

      {/* buttons  */}
      <div>
        <button onClick={handlePrevYear}>&lt;&lt;</button>
        <button onClick={handlePrevMonth}>&lt;</button>
        <button onClick={handleNextMonth}>&gt;</button>
        <button onClick={handleNextYear}>&gt;&gt;</button>
      </div>

      
    </div>
  )
}


export default App;
