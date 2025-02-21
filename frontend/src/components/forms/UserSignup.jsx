import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect, useMemo } from 'react';
import { addMentor } from '../../api/apiService';
import MultiSelectDropdown from './components/MultiSelectDropdown';
import FileUploader from './components/FileUploader';
import { useNavigate } from 'react-router-dom';

const UserSignup = () => {
  const [selectedExpertise, setSelectedExpertise] = useState([]);
  const navigate = useNavigate();

  const initialValues = useMemo(
    () => ({
      name: '',
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

    onSubmit: async (values, { resetForm }) => {
      try {
        await addMentor(values);
        resetForm();
        navigate('/');
      } catch (e) {
        console.log('Error : ', e);
      }
    },
  });

  useEffect(() => {
    if (selectedExpertise !== formik.values.expertise) {
      formik.setFieldValue('expertise', selectedExpertise);
    }
  }, [selectedExpertise, formik]);

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

        <div className="flex-1">
          <p className="block mb-2">Expertise</p>
          <div>
            <MultiSelectDropdown setMethod={setSelectedExpertise} />
          </div>
          {formik.touched.expertise && formik.errors.expertise && (
            <p className="errorMessage">{formik.errors.expertise}</p>
          )}
        </div>
        <FileUploader />
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

export default UserSignup;
