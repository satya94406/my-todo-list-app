import { useState } from "react";
import { auth } from "../components/Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
 
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/todo"); 
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User Signed In Successfully");
      navigate("/todo"); 
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">{isSignup ? "Sign Up" : "Sign In"}</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border rounded-md mb-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 border rounded-md mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={isSignup ? handleSignup : handleSignin}
          className="w-full bg-blue-500 cursor-pointer text-white py-2 rounded-md"
        >
          {isSignup ? "Sign Up" : "Sign In"}
        </button>
        <p
          className="mt-4 text-blue-600 cursor-pointer text-center"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
};

export default Login;