import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import Sky from "./pages/Sky";


window.global = window;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Layer z={0}>
      <Sky />
    </Layer>
  </StrictMode>
);

function Layer({ z = 0, children }) {
  return (
    <>
      <div className="layer" style={{ zIndex: z }} id={`layer-${z}`}>
        {children}
      </div>
    </>
  );
}
