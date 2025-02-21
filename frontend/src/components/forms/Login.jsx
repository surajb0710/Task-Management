import { useState } from 'react';
import { auth, googleProvider } from '../../firebase/firebase.js';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const token = await user.getIdToken();

      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.uid);
      alert('Google login successful!');
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="bg-[#F5F5F7] flex flex-col gap-4 rounded-lg p-4 w-1/3">
        <h2 className="text-2xl text-center font-bold">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#CCCCCC] py-[16.5px] px-[14px] rounded-[4px] text-base text-[#8E92BC]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2">
              Email
            </label>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#CCCCCC] py-[16.5px] px-[14px] rounded-[4px] text-base text-[#8E92BC]"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2.5 bg-black text-white rounded-lg"
          >
            Login
          </button>
        </form>
        <button
          onClick={handleGoogleLogin}
          className="w-full p-2.5 bg-black text-white rounded-lg"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
