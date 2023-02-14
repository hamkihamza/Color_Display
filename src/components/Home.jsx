import React, { useState, useRef } from "react";
import Draggable from "react-draggable";

const Home = ({ imageURL }) => {
  // onDragHandler
  const [data, setData] = useState({});
  const [coords, setCoords] = useState({"x":0,"y":0})

  function addImage() {
    // Creating Canvas
    const c = document.querySelector("canvas");
    const ctx = c.getContext("2d");

    // Second Canvas for the zoom
    const z = document.getElementById("zoom");
    const ztx = z.getContext("2d");


    const rect = c.getBoundingClientRect();

    const i = new Image();

    // CORS
    i.crossOrigin = "Anonymous";
    i.src = imageURL;

    // Draws the Image on the canvas
    i.onload = () => {
      ctx.drawImage(i, 0, 0, i.width, i.height, 0, 0, c.width, c.height);
    };

    // Keeping track of the coordinates on the Cursor
    c.addEventListener("mousemove", (e) => {
      // console.log(e.clientY,rect.top,rect.bottom)
      console.log(e.clientX - rect.left)
     
      const x = ((e.clientX - rect.left));
      const y = ((e.clientY - rect.top));
   
      // ZOOM FEATURE HERE!
      setCoords({"x":x,"y":y})
      
      ztx.drawImage(i,x*2,y*3.3,50,50,50,50,150,150);

      const newx = i.width - coords.x
      const newy = i.height - coords.y
  

    // Using ther meta data you can save the original image size and using that ratio to convert the canvas coordinates to fit 
    // the full image size coordinates

      const pixel = ctx.getImageData(x, y, 1, 1);
      const swatches = [];

    // Getting the data of all color swatches
    // Instead of using <pixel.data use number of Color Swatches
      // console.log(pixel.data)
      for (let i = 0; i < pixel.data.length; i++) {
        const colorSwatchesData = ctx.getImageData(x + i, y + i, 1, 1);

        swatches.push(
          `RGB(${colorSwatchesData.data[0]}, ${colorSwatchesData.data[1]}, ${colorSwatchesData.data[2]})`
        );
      }

    // Saving RGB Values
      const r = pixel.data[0];
      const g = pixel.data[1];
      const b = pixel.data[2];
    
    // Data {RBG, Coordinates, Color Swatches}
      const onDragHandler = {
        rgb: `RGB(${r},${g},${b})`,
        coordinates: `(${x.toFixed(2)}, ${y.toFixed(2)})`,
        colorSwatches: swatches,
      };

      setData(onDragHandler);
    });


  }

  return (
    <div>
      <div className="w-screen p-3">
        <div className="md:flex gap-5 justify-center h-full w-[50%] mx-auto">
          <canvas className="max-w-[500px] max-h-[500px] my-4 custom-cursor" />

          <div className="px-3 py-4 flex flex-col w-full h-full ml-5">
            <div className="font-bold text-lg w-full">
              <div className="flex space-x-2 items-center">
                RGB Value:&nbsp;&nbsp;&nbsp;{"   "}
                <div
                  className="w-5 h-5 p-1"
                  style={{ backgroundColor: data?.rgb }}
                ></div>{" "}
                <span className="rgb font-light">{data?.rgb}</span>
              </div>
            </div>
            <div className="font-bold text-lg">
              Coordinates:{" "}
              <span className="rgb font-light">{data?.coordinates}</span>
            </div>
            <div className="font-bold text-lg w-full">
              Color Swatches:{" "}
              {data?.colorSwatches?.map((color) => {
                return (
                  <div className="flex items-center space-x-2">
                    <span
                      className="w-5 ml-1 p-1 h-5"
                      style={{ backgroundColor: color }}
                    ></span>
                    <p className="rgb font-light">{color}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {imageURL ? (
          <div className="mt-4">
            <Draggable>
              <div
                className={`border-2 border-black rounded-full w-5 h-5 dragger ${
                  imageURL ? "hidden" : "hidden"
                } focus-within:shadow-md`}
              ></div>
            </Draggable>
          </div>
        ) : (
          ""
        )}

        {imageURL && addImage()}
      </div>

      <div>
      <canvas id="zoom"></canvas>
    </div>
    </div>

  );
};

export default Home;
