import "./App.css";
import logo from "../public/logo.png";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("déclenchement useEffect");
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Chargement ...</p>
  ) : (
    <>
      {data.map((element, index) => {
        return <p key={index}>{element}</p>;
      })}
      <header>
        <img src={logo} alt="logo-deliveroo" />
      </header>
      <main></main>
    </>
  );
}

export default App;
