import type React from "react";

interface TileProps {
  heading: React.ReactNode;
  content: React.ReactNode;
}

const Tile = ({ heading, content }: TileProps) => {
  return (
    <div
      className="tile"
      style={{ border: "1px solid", padding: "10px", margin: "10px", flex: 1 }}
    >
      <h3 style={{}}>{heading}</h3>
      <p>{content}</p>
    </div>
  );
};

export default Tile;
