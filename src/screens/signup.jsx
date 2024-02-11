import React, { useEffect, useState } from "react";

import { useCountries } from "use-react-countries";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Option,
  input,
  Radio
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db, auth, storage } from "../config/firebaseconfig/firebaseconfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [noLoader, setLoader] = useState(false);
  const [selectedType, setSelectedType] = useState("TTF");
  useEffect(() => {
    handleSignup();
  }, [selectedCourse]);

  const { countries } = useCountries();
  const [country, setCountry] = React.useState(118);
  const { name, flags, countryCallingCode } = countries[country];
  let nav = useNavigate();

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleFatherNameChange = (e) => {
    setFatherName(e.target.value);
  };

  const handleCourseChange = (value) => {
    setSelectedCourse(value);
  };

  const handleGenderChange = (value) => {
    setSelectedGender(value);
  };

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setSelectedImage(imageFile);
  };
  
  const handleTypeChange = (value) => {
    setSelectedType(value);
  };


  let [arr, setArr] = useState([]);

  async function handleSignup() {
    try {
      const querySnapshot = await getDocs(collection(db, "courses"));
      const coursesData = [];
      querySnapshot.forEach((doc) => {
        coursesData.push({ id: doc.id, ...doc.data() });
      });
      setArr(coursesData);
      console.log(arr);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (
      !fullName ||
      !email ||
      !password ||
      !address ||
      !fatherName ||
      !selectedCourse ||
      !selectedGender ||
      !phoneNumber ||
      !selectedImage
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all the required fields!",
      });
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      const uid = user.uid;
     
    const formData = {
      fullName,
      uid,
      email,
      password,
      address,
      fatherName,
      selectedCourse,
      selectedGender,
      phoneNumber,
      days:selectedType, 
    };

  
      setLoader(!noLoader);
  
      const imageRef = ref(storage, `userImages/${uid}/${selectedImage.name}`);
      await uploadBytes(imageRef, selectedImage);
  
      const imageUrl = await getDownloadURL(imageRef);
  
      formData.imageUrl = imageUrl;
  
      await updateProfile(auth.currentUser, {
        displayName: fullName,
        photoURL: imageUrl,
      });
  
      const docRef = await addDoc(collection(db, "students"), formData);
      console.log("Document written with ID: ", docRef.id);
  
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logging In as " + fullName,
        showConfirmButton: false,
        timer: 1500,
      });
  
      nav("/studentsPage");
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      Swal.fire({
        position: "center",
        icon: "error",
        title: errorMessage,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  
  return (

    <div className="flex justify-center items-center mt-20">
      <Card color="transparent" className="p-10" shadow={true}>
        <Typography variant="h2" className="text-center" color="blue-gray">
          Sign Up
        </Typography>

        <form
          className="mt-8 mb-2  max-w-screen-md mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="lg:flex lg:gap-7">
            <div className="mb-4 lg:w-1/2 lg:mb-0 lg:pr-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Full Name
              </Typography>
              <Input
                type="text"
                size="lg"
                placeholder="Full name"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={fullName}
                onChange={handleFullNameChange}
              />
              <Typography variant="h6" color="blue-gray" className="mb-3 mt-4">
                Email
              </Typography>
              <Input
                type="email"
                size="lg"
                placeholder="name@mail.com"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mb-4 lg:w-1/2 lg:pl-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={password}
                onChange={handlePasswordChange}
              />
              <Typography variant="h6" color="blue-gray" className="mb-3 mt-4">
                Address
              </Typography>
              <Input
                type="text"
                size="lg"
                placeholder="Address"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={address}
                onChange={handleAddressChange}
              />
            </div>
          </div>

          <div className="mb-4 lg:flex lg:gap-7">
            <div className="lg:w-1/2 lg:mb-0 lg:pr-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Father Name
              </Typography>
              <Input
                type="text"
                size="lg"
                placeholder="Father's Name"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={fatherName}
                onChange={handleFatherNameChange}
              />
            </div>
            <div className="lg:w-1/2 lg:pl-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Select Course
              </Typography>
              <div className="w-full lg:w-64">
                <Select label="Course Selected" onChange={(value) => handleCourseChange(value)}>
                  {
                    arr.map((course) => {
                      return <Option key={course.id} value={course.courseName}>{course.courseName}</Option>

                    })
                  }

                </Select>
              </div>
            </div>
          </div>

          <div className="mb-4 lg:flex lg:gap-7">
            <div className="lg:w-1/2 lg:mb-0 lg:pr-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Gender
              </Typography>
              <div className="w-full lg:w-64">
                <Select label="Sex" onChange={(value) => handleGenderChange(value)}>
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </div>
            </div>
            <div className="lg:w-1/2 lg:pl-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Phone
              </Typography>
              <div className="relative flex w-full max-w-[24rem]">
                <Menu placement="bottom-start">
                  <MenuHandler>
                    <Button
                      ripple={false}
                      variant="text"
                      color="blue-gray"
                      className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                    >
                      <img
                        src={flags.svg}
                        alt={name}
                        className="h-4 w-4 rounded-full object-cover"
                      />
                      {countryCallingCode}
                    </Button>
                  </MenuHandler>
                  <MenuList className="max-h-[20rem] max-w-[18rem]">
                    {countries.map(({ name, flags, countryCallingCode }, index) => {
                      return (
                        <MenuItem
                          key={name}
                          value={name}
                          className="flex items-center gap-2"
                          onClick={() => setCountry(index)}
                        >
                          <img
                            src={flags.svg}
                            alt={name}
                            className="h-5 w-5 rounded-full object-cover"
                          />
                          {name} <span className="ml-auto">{countryCallingCode}</span>
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </Menu>
                <Input
                  type="number"
                  placeholder="Mobile Number"
                  className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  containerProps={{
                    className: "min-w-0",
                  }}
                  value={phoneNumber}
                  onChange={(e) => handlePhoneNumberChange(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mb-4 flex flex-col flex-wrap">
            <label htmlFor="image" className="text-sm text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full"
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
          <div className="flex justify-center">
            <Button type="submit" loading={noLoader ? true : null} className="mt-6 w-2/3 px-auto text-center text-sm" >
              Sign Up
            </Button>
          </div>

          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/" className="font-medium text-gray-900">
              Sign In
            </Link>
          </Typography> 
        </form>
      </Card>
    </div>
  );
}

export default Signup;
