import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";


const TODOPage = () => {
  const navigate=useNavigate();
  const handleSignout = async ()=>{

    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error(error);
    }

  }
  return (
    <div>
      <button className='p-6 bg-blue-500 rounded-lg' onClick={handleSignout}>Sign out</button>
    </div>
  )
}

export default TODOPage