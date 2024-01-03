import { useState } from "react";
import "./App.css";

type Point = {
  clientX: number;
  clientY: number;
};

function App() {
  const [points, setPoints] = useState<Point[]>([]);
  const [undoPoints, setUndoPoints] = useState<Point[]>([]);

  const handlePlaceCircle = (e: React.MouseEvent<HTMLDivElement>) => {
    setPoints([
      ...points,
      {
        clientX: e.clientX,
        clientY: e.clientY,
      },
    ]);
  };

  const handleUndo = () => {
    const newUndoPoints = [...undoPoints].concat(points[points.length - 1]);
    setUndoPoints(newUndoPoints);
    setPoints(
      points.filter(
        (point) =>
          !newUndoPoints.some(
            (undoPoint) =>
              undoPoint.clientX === point.clientX &&
              undoPoint.clientY === point.clientY
          )
      )
    );
  };

  const handleRedo = () => {
    setPoints(points.concat(undoPoints[undoPoints.length - 1]));
    undoPoints.pop();
    setUndoPoints(undoPoints);
  };

  return (
    <>
      <div className="wrapper__button">
        <button disabled={points.length === 0} onClick={handleUndo}>
          Undo
        </button>
        <button disabled={undoPoints.length === 0} onClick={handleRedo}>
          Redo
        </button>
      </div>
      <div className="wrapper" onClick={handlePlaceCircle}>
        {points.map((point, index) => (
          <div
            key={index}
            className="wrapper__point"
            style={{
              left: point.clientX,
              top: point.clientY,
            }}
          ></div>
        ))}
      </div>
    </>
  );
}

export default App;
