import React, { useState } from "react";

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
  Option
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { countries } = useCountries();
  const [country, setCountry] = React.useState(0);
  const { name, flags, countryCallingCode } = countries[country];

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      fullName,
      email,
      password,
      address,
      fatherName,
      selectedCourse,
      selectedGender,
      phoneNumber
    };
    console.log(formData);
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
                  <Option value="Material Tailwind HTML">Material Tailwind HTML</Option>
                  <Option value="Material Tailwind React">Material Tailwind React</Option>
                  <Option value="Material Tailwind Vue">Material Tailwind Vue</Option>
                  <Option value="Material Tailwind Angular">Material Tailwind Angular</Option>
                  <Option value="Material Tailwind Svelte">Material Tailwind Svelte</Option>
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

         <div className="flex justify-center">
         <Button  type="submit" className="mt-6 w-2/3 text-sm" >
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
