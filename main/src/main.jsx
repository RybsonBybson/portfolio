import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import MainScene from "./pages/MainScene";

window.global = window;

const root = createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Layer z={0}>
      <MainScene />
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
