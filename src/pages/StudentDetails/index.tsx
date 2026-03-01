import { useEffect, useState } from "react";
import { useLocation, useMatch } from "react-router-dom";
import { getStudentDetails } from "../../services/students";

const StudentDetails = () => {
  const location = useLocation();
  console.log("Location state:", location.state);
  const match = useMatch("/student/:id");
  const id = match?.params?.id;
  const [studentDetails, setStudentDetails] = useState<
    | {
        id: number;
        name: string;
        email: string;
        age?: number;
      }
    | null
    | undefined
  >(null);

  useEffect(() => {
    if (id) {
      getStudentDetails(Number(id)).then((details) =>
        setStudentDetails(details),
      );
    }
  }, [id]);

  return (
    <div className="student-details" style={{ padding: "20px" }}>
      <h1>Student Details</h1>
      <p>Student ID: {id}</p>
      {studentDetails && (
        <>
          <p>Name: {studentDetails.name}</p>
          <p>Email: {studentDetails.email}</p>
          <p>Age: {studentDetails.age}</p>
        </>
      )}
    </div>
  );
};

export default StudentDetails;
