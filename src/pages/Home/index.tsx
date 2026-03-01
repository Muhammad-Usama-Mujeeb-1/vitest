import { getAllStudents } from "../../services/students";
import HeaderGrid from "./components/HeaderGrid";
import StudentGrid from "./components/StudentGrid";

import { useEffect, useState } from "react";

type PageState = "done" | "loading" | "error";

const Home = () => {
  const [students, setStudents] = useState<
    { id: number; name: string; email: string }[]
  >([]);
  const [state, setState] = useState<PageState>("loading");

  useEffect(() => {
    getAllStudents()
      .then((students) => {
        setStudents(students);
        setState("done");
      })
      .catch(() => setState("error"));
  }, []);

  return state === "loading" ? (
    <p>Loading...</p>
  ) : state === "error" ? (
    <p>Error loading students.</p>
  ) : (
    <div
      className="home"
      style={{ width: "100vw", boxSizing: "border-box", padding: "20px" }}
    >
      <HeaderGrid />
      <StudentGrid students={students} />
    </div>
  );
};

export default Home;
