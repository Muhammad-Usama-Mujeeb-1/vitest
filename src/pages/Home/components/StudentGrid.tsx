import { useNavigate } from "react-router-dom";
import type { StudentTileProps } from "./StudentTile";
import StudentTile from "./StudentTile";

interface StudentGridProps {
  students: StudentTileProps[];
}

const StudentGrid = ({ students }: StudentGridProps) => {
  const navigate = useNavigate();

  const handleStudentClick = (id: number) => {
    navigate(`/student/${id}`, {
      state: { from: "/home", student: students.find((s) => s.id === id) },
    });
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
      }}
    >
      {students.map((student) => (
        <StudentTile
          id={student.id}
          name={student.name}
          email={student.email}
          onClick={handleStudentClick}
        />
      ))}
    </div>
  );
};

export default StudentGrid;
