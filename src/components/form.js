import React, { useState } from 'react';

export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [lang, setLang] = useState("");
  const [gender, setGender] = useState("");
  const [values, setTheValues] = useState(false);
  const [obj, setObj] = useState();


  return (
    <div style={{ border: "1px solid blue", padding: "10px", margin: "100px"}} className="container">
      <h1 style={{textAlign:"center"}}>Form assignment</h1>
      <form onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        const arr = [name, email, age, lang, gender];
        arr.filter(x => x.length).length === 5 && setTheValues(true);
        setObj({ name, email, age, lang, gender });
      }}>

        <p>Name: <input name="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter your name"></input></p>
        <p>Email: <input name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email"></input></p>
        <p>Age: <input name="age" value={age} onChange={(event) => setAge(event.target.value)} placeholder="Enter your age"></input></p>
        <p>Language: <select value={lang} onChange={(event) => setLang(event.target.value)}>
            <option>Select language</option>
            <option>C</option>
            <option>C++</option>
            <option>Java</option>
            <option>JavaScript</option>
            <option>Python</option>
          </select>
        </p>
        <p>Gender: <label><input
        type="radio"
        value="Male"
        checked={gender === "Male"}
        onChange={(event) => setGender(event.target.value)} />Male</label> 
        <label><input
        type="radio"
        value="Female"
        checked={gender === "Female"}
        onChange={(event) => setGender(event.target.value)} />Female</label>
        </p>
        <button type="submit" >Submit</button>

        { values===true &&
        <div style={{
          backgroundColor:"yellow",
          textAlign: "center",
          width:"30%",
          paddingBottom: "10px",
          color: "black"
          }}>
          <h4>Entered values are: </h4>
          Name: {obj.name} <br/>
          Email: {obj.email} <br/>
          Age: {obj.age} <br/>
          lang: {obj.lang} <br/>
          gender: {obj.gender}
        </div> }
        
      </form>
    </div>
  )
}
