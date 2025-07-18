import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Inputs/Input';

export const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = .useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // handle signup form submit
  const handleSignUp = async (e) => {
    e.preventDefault();
    
  };
  return <div className=''>
    <h3 className=''>Create an Account</h3>
    <p className=''>
      Join us today by entering your details below.
    </p>

    <form className=''>
      <div className=''>
        <Input
        value={fullName}
        onChange={({target}) => setFullName(target.value)}
        label="Full Name"
        placeholder="john"
        type="text"
        />

        <Input
        value={email}
        onChange={({target}) => setEmail(target.value)}
        label="Email Address"
        placeholder="john@example.com"
        type="text"
        />

        <Input
        value={password}
        onChange={({target}) => setPassword(target.value)}
        label="password"
        placeholder="Min 8 characters"
        type="password"/>
      </div>

      {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p> }

      <button type='submit' className=''>
        SIGN UP
      </button>

      <p className=''>
        Already an account?{" "}

        <button
        className=''
        onClick={() => {
          setCurrentPage("login");
        }}> 
          
          Login
        </button>
      </p>
    </form>
  </div>
}
