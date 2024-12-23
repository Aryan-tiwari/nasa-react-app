import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import SideBar from "./components/SideBar";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;

  function handleToggleModal() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    async function fetchAPIData() {
      const url =
        "https://api.nasa.gov/planetary/apod" + `?api_key=${NASA_KEY}`;

      const today = new Date().toDateString();
      const localKey = `NASA-${today}`;
      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey));
        setData(apiData);
        console.log("Fetched from Cache Today");
        return;
      }
      localStorage.clear();
      try {
        const res = await fetch(url);
        const apiData = await res.json();
        localStorage.setItem(localKey, JSON.stringify(apiData));
        setData(apiData);
        console.log("Fetched from Api Today");
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchAPIData();
  }, []);

  return (
    <>
      {data ? (
        <Main data={data} />
      ) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && (
        <SideBar data={data} handleToggleModal={handleToggleModal} />
      )}
      {data && <Footer data={data} handleToggleModal={handleToggleModal} />}
    </>
  );
}

export default App;
