import React from "react";
import ReactDOM from "react-dom";
import { LoadScript, GoogleMap, DrawingManager } from "@react-google-maps/api";

import "./styles.css";

const API_KEY = "";

function App() {
  const [state, setState] = React.useState({
    drawingMode: "polygon"
  });

  const noDraw = () => {
    setState(function set(prevState) {
      return Object.assign({}, prevState, {
        drawingMode: "maker"
      });
    });
  };

  return (
    <div className="App">
      <LoadScript
        id="script-loader"
        googleMapsApiKey={API_KEY}
        libraries={["drawing"]}
        language="en"
        region="us"
      >
        <GoogleMap
          mapContainerClassName="App-map"
          center={{
            lat: 38.9065495,
            lng: -77.0518192
          }}
          zoom={10}
          version="weekly"
        >
          <DrawingManager
            drawingMode={state.drawingMode}
            options={{
              drawingControl: true,
              drawingControlOptions: {
                drawingModes: ["polygon"]
              },
              polygonOptions: {
                fillColor: `#2196F3`,
                strokeColor: `#2196F3`,
                fillOpacity: 0.5,
                strokeWeight: 2,
                clickable: true,
                editable: true,
                draggable: true,
                zIndex: 1
              }
            }}
            onPolygonComplete={poly => {
              /*const polyArray = poly.getPath().getArray();
              let paths = [];
              polyArray.forEach(function(path) {
                paths.push({ latitude: path.lat(), longitude: path.lng() });
              });
              console.log("onPolygonComplete", polyArray);*/
              console.log("onPolygonComplete", poly);
              noDraw();
            }}
            /*onOverlayComplete={poly => {
              const polyArray = poly.getPath().getArray();
              let paths = [];
              polyArray.forEach(function(path) {
                paths.push({ latitude: path.lat(), longitude: path.lng() });
              });
              console.log("onOverlayComplete", polyArray);
            }}*/
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
