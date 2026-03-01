const getAllStudents = async () => {
  const students: {
    id: number;
    name: string;
    email: string;
  }[] = [
    { id: 1, name: "Alice", email: "alice@test.com" },
    { id: 2, name: "Bob", email: "bob@test.com" },
    { id: 3, name: "Charlie", email: "charlie@test.com" },
    { id: 4, name: "David", email: "david@test.com" },
    { id: 5, name: "Eve", email: "eve@test.com" },
    { id: 6, name: "Frank", email: "frank@test.com" },
    { id: 7, name: "Grace", email: "grace@test.com" },
    { id: 8, name: "Heidi", email: "heidi@test.com" },
    { id: 9, name: "Ivan", email: "ivan@test.com" },
  ];
  return Promise.resolve(students);
};

const getStudentDetails = async (id: number) => {
  const students: {
    id: number;
    name: string;
    email: string;
    age?: number;
  }[] = [
    { id: 1, name: "Alice", email: "alice@test.com", age: 20 },
    { id: 2, name: "Bob", email: "bob@test.com", age: 22 },
    { id: 3, name: "Charlie", email: "charlie@test.com", age: 21 },
    { id: 4, name: "David", email: "david@test.com", age: 23 },
    { id: 5, name: "Eve", email: "eve@test.com", age: 20 },
    { id: 6, name: "Frank", email: "frank@test.com", age: 22 },
    { id: 7, name: "Grace", email: "grace@test.com", age: 21 },
    { id: 8, name: "Heidi", email: "heidi@test.com", age: 23 },
    { id: 9, name: "Ivan", email: "ivan@test.com", age: 20 },
  ];
  const student = students.find((s) => s.id === id);
  return Promise.resolve(student);
};

export { getAllStudents, getStudentDetails };
