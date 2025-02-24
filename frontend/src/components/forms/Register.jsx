import { useState, useEffect, useMemo } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/firebase';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import MultiSelectDropdown from './components/MultiSelectDropdown';
import { SingleImageUploader } from './components/ImageUploader';

const Register = () => {
  const [selectedExpertise, setSelectedExpertise] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const navigate = useNavigate();

  const initialValues = useMemo(
    () => ({
      name: '',
      email: '',
      password: '',
      userType: 'student',
      expertise: [],
      imageUrl: '',
      createdAt: new Date().toISOString(),
      reviews: [],
      followers: [],
      tasksMentored: [],
    }),
    []
  );

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Must be 5 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
      expertise: Yup.array()
        .of(Yup.string().required('expertise is required'))
        .min(1, 'at least one expertise is required'),
    }),

    onSubmit: async (values) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formik.values.email,
          formik.values.password
        );
        const user = userCredential.user;

        const collectionName =
          formik.values.userType === 'mentor' ? 'mentors' : 'students';

        // eslint-disable-next-line no-unused-vars
        const { reviews, followers, tasksMentored, ...studentData } = values;
        const mentorData = values;

        const dataToSend =
          collectionName === 'mentors' ? mentorData : studentData;

        await setDoc(doc(db, collectionName, user.uid), dataToSend);

        alert('Registration successful!');
        navigate('/');
      } catch (error) {
        alert(error.message);
      }
    },
  });

  useEffect(() => {
    if (selectedExpertise !== formik.values.expertise) {
      formik.setFieldValue('expertise', selectedExpertise);
    }
  }, [selectedExpertise, formik]);

  useEffect(() => {
    if (selectedImage !== formik.values.imageUrl) {
      formik.setFieldValue('imageUrl', selectedImage);
    }
  }, [selectedImage, formik]);

  return (
    <div className="fixed p-6 rounded-lg left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 w-200 bg-[#F5F5F7] z-100  text-[#141522]">
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name" className="block mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter full name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            className="w-full border border-[#CCCCCC] py-[16.5px] px-[14px] rounded-[4px] text-base text-[#8E92BC]"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500">{formik.errors.name}</p>
          )}
          <br />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            className="w-full border border-[#CCCCCC] py-[16.5px] px-[14px] rounded-[4px] text-base text-[#8E92BC]"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500">{formik.errors.email}</p>
          )}
          <br />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            className="w-full border border-[#CCCCCC] py-[16.5px] px-[14px] rounded-[4px] text-base text-[#8E92BC]"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500">{formik.errors.password}</p>
          )}
          <br />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-2">
              <input
                name="userType"
                type="radio"
                value="student"
                checked={formik.values.userType === 'student'}
                onChange={formik.handleChange}
              />
              Student
            </label>
            {formik.touched.userType && formik.errors.userType && (
              <p className="errorMessage">{formik.errors.userType}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="block mb-2">
              <input
                name="userType"
                type="radio"
                value="mentor"
                checked={formik.values.userType === 'mentor'}
                onChange={formik.handleChange}
              />
              Mentor
            </label>
            {formik.touched.userType && formik.errors.userType && (
              <p className="errorMessage">{formik.errors.userType}</p>
            )}
          </div>
        </div>
        <div className="flex-1">
          <p className="block mb-2">Expertise</p>
          <div>
            <MultiSelectDropdown setMethod={setSelectedExpertise} />
          </div>
          {formik.touched.expertise && formik.errors.expertise && (
            <p className="errorMessage">{formik.errors.expertise}</p>
          )}
        </div>
        <SingleImageUploader setSelectedImage={setSelectedImage} />
        <button
          type="submit"
          className="w-full p-2.5 bg-black text-white rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
