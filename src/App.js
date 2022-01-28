import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProgressBar } from "react-bootstrap";
import "./App.css";
function App() {
  const [id, setId] = useState("");
  const [marks, setMarks] = useState("");
  var totalMarks = 0;
  var percentages = 0;

  const getMarks = () => {
    fetch(`https://61c55338c003e70017b7965d.mockapi.io/marks/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((mks) => setMarks(mks));
  };
  useEffect(getMarks, [id]);

  const handleClick = (e) => {
    e.preventDefault();
    setId(e.target.id.value);
  };

  totalMarks +=
    marks.maths +
    marks.physics +
    marks.chemistry +
    marks.biology +
    marks.english;
  
  percentages += totalMarks / 5;

  const styles = {
   width:"30%",
  }
  const now = percentages;
 
  
  const progressInstance = <ProgressBar style={styles} now={now} label={`${now}% Completed `} />;

  return (
    <div>
      <p className="text my-4">Calculate the percentage of a Person's Marks</p>
      <form className="form my-4" onSubmit={handleClick}>
        <input className="my-3" style={{width:"20%"}}type="text" name="id" placeholder="Students ID" />
        <br/>
        <button style={{width:"15%"}}>Get data from server</button>
      </form>
      <div className="inputs">
        <p>Subject Percentage</p>
        <p>Maths:<span>{marks.maths}</span></p>
        <p>Physics:<span>{marks.physics}</span></p>
        <p>Chemistry:<span>{marks.chemistry}</span></p>
        <p>Biology:<span>{marks.biology}</span></p>
        <p>English:<span>{marks.english}</span></p>

        <p>Total Percentages:<br />
          {progressInstance}</p>
      </div>
    </div>
  );
}

export default App;
