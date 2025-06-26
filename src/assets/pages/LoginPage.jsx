import React, { useState } from "react";
// Auth removed for demo
import { useNavigate } from "react-router-dom";

const API_ENDPOINT = 'https://idosyc6rlfhzpl6bcctq2s3uia.appsync-api.eu-west-2.amazonaws.com/graphql';

function LoginPage ({setIsAuth}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  let navigate = useNavigate();

  const handleSignIn = async () => {
    // Demo mode - skip actual auth
    setIsAuth(true);
    navigate("/amend");
  };

  const handleSignUp = async () => {
    alert("Demo mode - sign up disabled");
    setIsSignUp(false);
  };

  return (
    <div className="loginPage">
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={isSignUp ? handleSignUp : handleSignIn}>
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
        <button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Already have an account?' : 'Need an account?'}
        </button>
      </div>
    </div>
  )
}

export default LoginPage;