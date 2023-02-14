import { useState } from "react";
import Home from "./components/Home";


function App() {
  const [imageURL, setImageURL] = useState("");

  return (
    <div className="App px-5 flex flex-col justify-center items-center">
      <h1 className="text-center text-xl my-4 font-bold">
        Image Region of Interest Selector
      </h1>

      <input
          type="text"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          placeholder="Enter the image url"
          className="px-2 py-3 w-[50%] shadow-md focus-within:shadow-lg outline-none text-md"
        />

        {/* rendering our component and then passing the imageURL as a prop */}
        <Home imageURL={imageURL}/>

    </div>
  );
}

export default App;
