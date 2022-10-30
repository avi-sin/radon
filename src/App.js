// import logo from './logo.svg';
// import './App.css';
import students from './students.json';
import Form from './components/form.js';

function App() {
  return (
    <>
      <div className="App" >

        <div style={{ border: "1px solid blue", padding: "10px", margin: "100px"}}>
          <h1 style={{textAlign:"center"}} >JSON Assignment</h1>
          {students.map((student, index) => {
            return <>
              <li key={index}>
                <strong>{student.name}</strong>
                <p>age : {student.age}</p>
                <p>subject : {student.subject}</p>
                <br />
              </li>
            </>
          })}
        </div>

        <br />

        <Form />
      </div>
    </>
  );
}

export default App;
