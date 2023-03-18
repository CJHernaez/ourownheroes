import { SetStateAction, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [lightStatus, setLightStatus] = useState(undefined);

  useEffect(() => {}, []);

  const toggleLight = () => {
    axios
      .request({
        method: "POST",
        url: `https://api.lifx.com/v1/lights/id%3Ad073d5656598/toggle`,
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization:
            "Bearer c3e80b048bc86f0281665e3be8995ae2788eabb6ddc0b0b2cb57259a0c1172f7",
        },
        data: { duration: 1 },
      })
      .then(function (response) {
        console.log(response.data);
        setLightStatus(response.data.results[0].power);
      })
      .catch(function (error) {
        console.error(error);
      });

    console.log(lightStatus);
    return count;
  };

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.lifx.com/v1/lights/id%3Ad073d5656598",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer c3e80b048bc86f0281665e3be8995ae2788eabb6ddc0b0b2cb57259a0c1172f7",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setLightStatus(response.data[0].power);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={toggleLight}>
          {" "}
          {lightStatus ? `The lights are ${lightStatus}` : "Checking Status"}
        </button>
        <p>Environment: {process.env.NODE_ENV}</p>
      </div>
      <p className="cj-throws-stuff-together">
        CJ will learn AWS through this... probably.
      </p>
    </div>
  );
}
export default App;
