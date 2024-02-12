import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../config/firebaseconfig/firebaseconfig";
import StdNavbar from '../components/navbarforstd';
import Navbar from '../components/navbar';

function StudentPage() {
  const [studentDetails, setStudentDetails] = useState(null);

  useEffect(() => {
    render();
  }, []);

  async function render() {
    try {
      const uid = localStorage.getItem("singleUid");
      console.log(uid);
      const q = query(collection(db, "students"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const studentData = querySnapshot.docs[0].data();
        setStudentDetails(studentData);
        console.log(studentData);
      } else {
        console.error("Student details not found");
        // Handle the case where student details are not found
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
      // Handle the error case
    }
  }

  return (<>

    <Navbar />
    <div className="flex min-h-screen w-screen items-center justify-center bg-blue-gray-100">
      <div className="bg-white p-8 mt-10 rounded-lg shadow-md w-screen max-w-screen-md">
        <div className="flex flex-col justify-between items-center">
          <div>
            <h2 className="text-2xl text-center mb-6 font-semibold">Student Details</h2>
          </div>
          <div className="flex items-center">
            <img src={studentDetails?.imageUrl} className="mb-5" width={500} alt="" />
          </div>
          <div className='flex items-center'>
            <div>
              User Id :
            </div>
            <td className="py-2 px-4 underline underline-red-200 text-center">{studentDetails?.uid}</td>
          </div>
        </div>
        <table className="w-full border-collapse border border-blue-gray-300">
          <tbody>
            <tr>
              <th className="py-2 pl-3 border text-left bg-blue-gray-100">Full Name</th>
              <td className="py-2 px-4 border text-center ">{studentDetails?.fullName}</td>
            </tr>
            <tr>
              <th className="py-2 pl-3 border text-left bg-blue-gray-100">Father Name</th>
              <td className="py-2 px-4 border text-center ">{studentDetails?.fatherName}</td>
            </tr>
            <tr>
              <th className="py-2 pl-3 border bg-blue-gray-100 text-left">Email</th>
              <td className="py-2 px-4 border text-center">{studentDetails?.email}</td>
            </tr>
            <tr>
              <th className="py-2 pl-3 border bg-blue-gray-100 text-left">Course Enrolled</th>
              <td className="py-2 px-4 border underline text-center">{studentDetails?.selectedCourse}</td>
            </tr>
            <tr>
              <th className="py-2 pl-3 border bg-blue-gray-100 text-left">Days</th>
              <td className="py-2 px-4 border text-center">{studentDetails?.days}</td>
            </tr>
            <tr>
              <th className="py-2 pl-3 border bg-blue-gray-100 text-left">Gender</th>
              <td className="py-2 px-4 border text-center">{studentDetails?.selectedGender}</td>
            </tr>
            <tr>
              <th className="py-2 pl-3 border bg-blue-gray-100 text-left">Contact Number</th>
              <td className="py-2 px-4 border text-center">{studentDetails?.phoneNumber}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </>
  );
}

export default StudentPage;
