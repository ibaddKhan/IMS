import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../config/firebaseconfig/firebaseconfig";
import { deleteUser } from "firebase/auth";
import Navbar from "../components/navbar";
import Swal from 'sweetalert2';


function allStudents() {
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

  const handleDelete = async (Docid) => {
    try {
      await deleteDoc(doc(db, "students", Docid));
      console.log("deleted");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Deleted",
        showConfirmButton: false,
        timer: 1500,
      });
      fetchData()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>

      <Navbar />
      <div className="container mx-auto mt-8">
        <h1 className="text-4xl text-center my-10">All Students</h1>
        <ul className="flex justify-center flex-col">
          {students.map((student) => (
            <li key={student.id} className="border p-4 rounded-md flex items-center justify-between mr-10 flex-wrap shadow-md hover:shadow-lg">
              <div className="flex items-center space-x-4">
                <img className="" width={60} src={student.imageUrl} alt={student.fullName} />
                <div>
                  <strong className="text-xl">{student.fullName}</strong>
                  <div className="text-gray-600">Course: {student.selectedCourse}</div>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => handleDelete(student.id)}
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  See Details
                </button>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default allStudents;
