// Allcourses.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../config/firebaseconfig/firebaseconfig';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Navbar from '../components/navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Allcourses = () => {
  let navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate('/');
    }
    if (user.uid !== "5jFgN6C2KOaYBJQTALATxJY944p2") {
      navigate('/studentpage');
      return;
    }
  });
  const [arr, setArr] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const coursesData = [];
        querySnapshot.forEach((doc) => {
          coursesData.push({ id: doc.id, ...doc.data() });
        });
        setArr(coursesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "courses", id));
      setArr(arr.filter(course => course.id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleEdit = async (id) => {
    const newTeacherName = prompt("Enter new teacher's name:") || "";
    const newCourseName = prompt("Enter new course name:") || "";
    const newType = prompt("Enter new days (e.g., TTF, MWF):") || "";

    if (newTeacherName || newCourseName || newType) {
      try {
        const updatedData = {};
        if (newTeacherName) updatedData.teacherName = newTeacherName;
        if (newCourseName) updatedData.courseName = newCourseName;
        if (newType) updatedData.type = newType;

        await updateDoc(doc(db, "courses", id), updatedData);
        setArr(arr.map(course => (course.id === id ? { ...course, ...updatedData } : course)));
      } catch (error) {
        console.error("Error updating course:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl text-center my-4">All Courses</h1>
        {arr.map((course) => (
          <div key={course.id} className="bg-white flex justify-between shadow-lg p-4 mb-4 rounded-md">
            <div>
              <p className="text-xl font-semibold mb-2">{course.teacherName}</p>
              <p className="text-lg mb-2">{course.courseName}</p>
              <p className="text-gray-500">{course.type}</p>
            </div>
            <div className="flex mt-4 space-x-4">
              <div>
                <button
                  className="bg-white-300 border border-blue-200 hover:bg-blue-400 hover:text-white px-4 py-2 rounded-md"
                  onClick={() => handleEdit(course.id)}
                >
                  Edit
                </button>
              </div>
              <div>
                <button
                  className="bg-white-300 border border-red-200 hover:bg-red-400 hover:text-white text-black px-4 py-2 rounded-md"
                  onClick={() => handleDelete(course.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Allcourses;
