import { useState } from 'react';
import './App.css'

type Log = {
  id: number,
  log: string
}

function App() {
  const [logs, setLogs] = useState<Log[]>([]);

  setInterval(() => {
    fetch('http://localhost:8010', {
      method: 'get'
    }).then(function() {
        console.log('Requested');
    }).catch(function(err) {
      console.log("Error:"+err);
    });
  }, 1000)

  const handleLogs = async () => {

    try {
      const response = await fetch("http://localhost:8000");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      setLogs(responseData);

    } catch (error) {
      console.error("Error:", error);
    }

  }

  return (
    <>
      <div>
        <h1>Request Application Started</h1>
        <p>Click button below to view registered logs</p>
        <input
          type="button"
          value="View Logs"
          onClick={handleLogs}
        />
        <p>Total Log Length: {logs.length}</p>
        {logs.map((e) => (
          <p><span>{e.id}</span> : {e.log}</p>
        ))}
      </div>
    </>
  )
}

export default App
