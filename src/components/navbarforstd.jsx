import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseconfig/firebaseconfig';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

const StdNavbar = () => {
  let navigate = useNavigate();

  function handleLogout() {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  }

  return (
    <div className="bg-gray-800 text-white p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl tracking-widest font-semibold">IMS</div>
        <div>
          <Button onClick={handleLogout}  size="sm">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StdNavbar;
