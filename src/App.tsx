import { SetStateAction, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import LifxService from "./services/LifxService";

function App() {
  const [count, setCount] = useState(0);
  const [lightStatus, setLightStatus] = useState(undefined);
  const [lightcolor, setLightColor] = useState("")
  let lights = []

  useEffect(() => {
    LifxService.getLights(setLightStatus, setLightColor,"3Ad073d5656598")
    console.log(lightcolor)
  }, [lightStatus]);

  const colors = { red: 11111, blue: 22222 };
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
      <h2> {lightcolor ? `The lights are ${lightStatus == "off"? "off":LifxService.colorParser(lightcolor)}` : "Checking Status"}</h2>
      <div className="card">
        <button onClick={() => {LifxService.toggleLight(setLightStatus, '3Ad073d5656598')}}>
          {" "}
          {lightStatus ? `The lights are ${lightStatus}` : "Checking Status"}
        </button>

        <button onClick={() => {LifxService.setLightState(setLightStatus, 'red')}}>
          {" "}
          {"RED"}
        </button>

        <button onClick={() => {LifxService.setLightState(setLightStatus, 'yellow')}}>
          {" "}
          {"YELLOW"}
        </button>

        <button onClick={() => {LifxService.setLightState(setLightStatus, 'green')}}>
          {" "}
          {"GREEN"}
        </button>

        <button onClick={() => {LifxService.setLightState(setLightStatus, '')}}>
          {" "}
          {"OFF"}
        </button>

        <p>Environment: {process.env.NODE_ENV}</p>
      </div>
      <select>
        {Array.from(Array(100), (e, i) => {
          return <option value={i + 1}>{i + 1}</option>;
        })}
      </select>
      <p className="cj-throws-stuff-together">
        {"CJ will learn AWS through this... probably. And hopefully Eden will help. Also pls hit the green button : ) 12/5/2023"}
      </p>
    </div>
  );
}
export default App;
