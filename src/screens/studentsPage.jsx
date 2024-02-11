import React, { useEffect, useState } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db, auth } from "../config/firebaseconfig/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";

function StudentPage() {
  const [user, setUser] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
  const [errorText, setErrorText] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        stdDetails(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const stdDetails = async (uid) => {
    try {
      const q = query(collection(db, "students"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const studentData = querySnapshot.docs[0].data();
        setStudentDetails(studentData);
      } else {
        console.error("Student details not found");
        setErrorText("Your account has been removed from this course");
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
      setErrorText("An error occurred while fetching student details");
    }
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-blue-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-screen max-w-screen-md ">
      <h2 className="text-2xl text-center mb-6 font-semibold">Student Details</h2>
        <div className="flex justify-between">
          <h1 className="text-2xl mt-5">Welcome, {user?.displayName}!</h1>
          <div className="">
            <img src={studentDetails?.imageUrl} className="mb-5" width={120} alt="" />
            

          </div>

        </div>
        {studentDetails ? (
          <table className="w-full border-collapse border border-blue-gray-300">
            <tbody>
              <tr>
                <th className="py-2 pl-3 border text-left bg-blue-gray-100">Full Name</th>
                <td className="py-2 px-4 border text-center ">{studentDetails.fullName}</td>
              </tr>
              <tr>
                <th className="py-2 pl-3 border text-left bg-blue-gray-100">Father Name</th>
                <td className="py-2 px-4 border text-center ">{studentDetails.fatherName}</td>
              </tr>
              <tr>
                <th className="py-2 pl-3 border bg-blue-gray-100 text-left">Email</th>
                <td className="py-2 px-4 border text-center">{studentDetails.email}</td>
              </tr>
              <tr>
                <th className="py-2 pl-3 border bg-blue-gray-100 text-left">Course Enrolled</th>
                <td className="py-2 px-4 border underline text-center">{studentDetails.selectedCourse}</td>
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
                <td className="py-2 px-4 border text-center">{studentDetails.phoneNumber}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <h1 className="text-red-500 text-xl mt-6">{errorText}!!</h1>
        )}
      </div>
    </div>
  );
}

export default StudentPage;
