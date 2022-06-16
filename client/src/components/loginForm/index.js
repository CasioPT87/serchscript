const React = require("react");
const { useState } = require("react");

function loginForm() {

    const [name, setName] = useState("Papa Piquillo");
    const [password, setPassword] = useState("El secreto de la jojoya");
    const [message, setMessage] = useState("");

    let handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const payload = {
          name,
          password,
        }
        let res = await fetch("http://localhost:8880/data/auth/login", {
          method: "POST",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Connection': 'keep-alive',
            'Accept': '*/*',
          },
          body: new URLSearchParams(payload),
        });

        const data = await res.json()
        setMessage(data.message)
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <div className="App">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Logueate</button>
  
          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div>
    );
  }
  
  module.exports = loginForm;