import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseconfig/firebaseconfig";

function StudentsPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      const studentsData = [];
      querySnapshot.forEach((doc) => {
        studentsData.push({ id: doc.id, ...doc.data() });
      });
      setStudents(studentsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl text-center my-10">All Students</h1>
      <ul className="flex mx-auto flex-col">
        {students.map((student) => (
          <li key={student.id} className="border p-4 rounded-md shadow-md hover:shadow-lg">
            <div className="flex items-center space-x-4">
              <img className="rounded-full" width={60} src={student.imageUrl} alt={student.fullName} />
              <div>
                <strong className="text-xl">{student.fullName}</strong>
                <div className="text-gray-600">Course: {student.selectedCourse}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentsPage;
