import React, { useState } from "react";
import { signIn, signUp } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/data';
import { useNavigate } from "react-router-dom";


const client = generateClient({ authMode: 'userPool' });

function LoginPage ({setIsAuth}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  let navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signIn({ username: email, password });
      
      const { data: whitelisted } = await client.models.Whitelist.list({
        filter: { email: { eq: email } }
      });
      
      if (whitelisted.length === 0) {
        alert("Unknown User");
        return;
      }
      
      setIsAuth(true);
      navigate("/amend");
    } catch (error) {
      console.error('Error signing in:', error);
      alert(error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await signUp({ username: email, password });
      alert("Please check your email to confirm your account");
      setIsSignUp(false);
    } catch (error) {
      console.error('Error signing up:', error);
      alert(error.message);
    }
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