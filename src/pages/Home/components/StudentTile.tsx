export interface StudentTileProps {
  id: number;
  name: string;
  email: string;
  onClick?: (id: number) => void;
  address?: string;
}

const StudentTile = ({
  id,
  name,
  email,
  onClick,
  address,
}: StudentTileProps) => {
  return (
    <div
      className="student-tile"
      key={id}
      style={{ border: "1px solid", padding: "10px", margin: "10px" }}
      onClick={() => onClick?.(id)}
    >
      <h3 data-testid="student-name">{name}</h3>
      <p data-testid="student-id">{id}</p>
      <p data-testid="student-email">{email}</p>
      {!address ? (
        <p
          style={{ fontStyle: "italic", color: "gray" }}
          data-testid="student-address"
        >
          No address provided
        </p>
      ) : (
        <p data-testid="student-address">{address}</p>
      )}
    </div>
  );
};

export default StudentTile;
