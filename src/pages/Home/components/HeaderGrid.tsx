import Tile from "./Tile";

const HeaderGrid = () => {
  return (
    <div
      className="header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        flex: 1,
        width: "100%",
      }}
    >
      <Tile heading="Teacher Name" content="John Doe" />
      <Tile heading="Subject" content="Mathematics" />
      <Tile
        heading="Students"
        content={
          <div>
            <p>
              Mens:<span>10</span>
            </p>
            <p>
              Womens:<span>10</span>
            </p>
          </div>
        }
      />
    </div>
  );
};

export default HeaderGrid;
