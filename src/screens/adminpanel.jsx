import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Radio,
  Typography,
} from "@material-tailwind/react";
import {
  collection,
  addDoc,
} from "firebase/firestore";
import { auth, db } from "../config/firebaseconfig/firebaseconfig";
import Swal from 'sweetalert2';
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

function Adminpanel() {
  let navigate =useNavigate()
  onAuthStateChanged(auth, (user) => {
    if (!user ||user.uid!=="5jFgN6C2KOaYBJQTALATxJY944p2") {
      navigate('/')
      return
    }
  })
  const [teacherName, setTeacherName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [selectedType, setSelectedType] = useState("MWF");

  const handleTeacherNameChange = (e) => {
    setTeacherName(e.target.value);
  };

  const handleCourseNameChange = (e) => {
    setCourseName(e.target.value);
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let courseObj = {
      teacherName: teacherName,
      courseName: courseName,
      type: selectedType,
    };

    try {
      const docRef = await addDoc(collection(db, "courses"), courseObj);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Course Added",
        showConfirmButton: false,
        timer: 1500,
      });
      setTeacherName("");
      setCourseName("");
      setSelectedType("MWF");
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "An Error Occurred",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex font-light justify-center items-center mt-20">
        <Card color="transparent" className="p-10" shadow={true}>
          <Typography variant="h2" className="text-center" color="blue-gray">
            Add Course
          </Typography>

          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Input
                variant="standard"
                size="lg"
                label="Teacher Name"
                className="text-lg"
                placeholder="Enter Teacher's name"
                value={teacherName}
                onChange={handleTeacherNameChange}
              />
              <Input
                variant="standard"
                size="lg"
                label="Course Name"
                className="text-lg"
                placeholder="Enter Course name"
                value={courseName}
                onChange={handleCourseNameChange}
              />
              <div className="flex gap-10">
                <Radio
                  name="type"
                  label="TTF"
                  value="TTF"
                  checked={selectedType === "TTF"}
                  onChange={() => handleTypeChange("TTF")}
                />
                <Radio
                  name="type"
                  label="MWF"
                  value="MWF"
                  checked={selectedType === "MWF"}
                  onChange={() => handleTypeChange("MWF")}
                />
                <Radio
                  name="type"
                  label="FSS"
                  value="FSS"
                  checked={selectedType === "FSS"}
                  onChange={() => handleTypeChange("FSS")}
                  disabled
                />
              </div>
            </div>
            <Button
              type="submit"
              className="mt-6 rounded-none text-md bg-blue-700"
              fullWidth
            >
              Add
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}

export default Adminpanel;
