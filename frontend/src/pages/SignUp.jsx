import MentorSignup from '../components/forms/MentorSignup';
import UserSignup from '../components/forms/UserSignup';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import { signup } from '../assets/assets';

const SignUp = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Tabs */}
      <Tabs value={value} onChange={handleChange} aria-label="signup tabs">
        <Tab icon={<MentorIcon />} label="Mentor" />
        <Tab icon={<StudentIcon />} label="User" />
      </Tabs>

      {/* Tab Content */}
      <div className="mt-4 w-full bg-green-200">
        {value === 0 && <MentorSignup />}
        {value === 1 && <UserSignup />}
      </div>
    </div>
  );
};

const StudentIcon = () => {
  return <img src={signup.student} alt="" className="h-8 w-8" />;
};

const MentorIcon = () => {
  return <img src={signup.mentor_01} alt="" className="h-8 w-8" />;
};

export default SignUp;
