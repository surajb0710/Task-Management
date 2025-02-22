import { useFormik } from 'formik';
import * as Yup from 'yup';
import MultiSelectDropdown from './components/MultiSelectDropdown';
import DatePicker from './components/DatePicker';
import { MultiImageUploader } from './components/ImageUploader';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { convertISTtoUTC } from '../../utils/dateFormat';

import { addTaskApi } from '../../api/apiService';
import { addTask } from '../../api/tasks';
import { useState, useEffect, useMemo, useRef } from 'react';

const AddTask = ({ setShowAddTaskModel }) => {
  const [selectedMentors, setSelectedMentors] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const initialValues = useMemo(
    () => ({
      title: '',
      category: '',
      progress: 0,
      dueDate: '',
      createdAt: new Date().toISOString(),
      assignee: '',
      mentors: [],
      media: [],
    }),
    []
  );

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        await addTaskApi(values);
        await addTask(values);
        resetForm();
        setShowAddTaskModel(false);
        console.log('Final task data:', values);
      } catch (e) {
        console.log('Error : ', e);
      }
    },
  });

  const prevDateRef = useRef(null);

  useEffect(() => {
    if (selectedDate && selectedDate !== prevDateRef.current) {
      const timestamp = convertISTtoUTC(new Date(selectedDate));

      if (formik.values.dueDate !== timestamp) {
        formik.setFieldValue('dueDate', timestamp);
      }

      prevDateRef.current = selectedDate;
    }
  }, [selectedDate, formik]);

  useEffect(() => {
    if (
      selectedMentors.length !== formik.values.mentors.length ||
      !selectedMentors.every(
        (mentor, idx) => mentor === formik.values.mentors[idx]
      )
    ) {
      formik.setFieldValue('mentors', selectedMentors);
    }
  }, [selectedMentors, formik.values.mentors, formik]);

  useEffect(() => {
    if (
      selectedImages.length !== formik.values.media.length ||
      !selectedImages.every((img, idx) => img === formik.values.media[idx])
    ) {
      formik.setFieldValue('media', selectedImages);
    }
  }, [selectedImages, formik.values.media, formik]);

  return (
    <div className="fixed p-6 rounded-lg left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 w-200 bg-[#F5F5F7] z-100  text-[#141522]">
      <h1 className="text-2xl font-semibold leading-[1.5] mb-4">Add a Task</h1>
      <button
        className="absolute right-4 top-4 p-1 cursor-pointer"
        onClick={() => setShowAddTaskModel(false)}
      >
        <CloseIcon />
      </button>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        {/* Task Title */}
        <div>
          <label htmlFor="title" className="block mb-2">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter task title"
            onChange={formik.handleChange}
            value={formik.values.title}
            onBlur={formik.handleBlur}
            className="w-full border border-[#CCCCCC] py-[16.5px] px-[14px] rounded-[4px] text-base text-[#8E92BC]"
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-500">{formik.errors.title}</p>
          )}
          <br />
        </div>

        {/* Category */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="category" className="block mb-2">
              Category
            </label>
            <div className="">
              <select
                name="category"
                id="category"
                className="w-full border border-[#CCCCCC] text-[#CCCCCC] py-[16.5px] px-[14px] rounded-[4px]"
                onChange={formik.handleChange}
                value={formik.values.category}
                onBlur={formik.handleBlur}
              >
                <option value="" disabled defaultValue>
                  Select Category
                </option>
                <option value="category1" className="text-[#141522]">
                  Category 1
                </option>
                <option value="category2" className="text-[#141522]">
                  Category 2
                </option>
                <option value="category3" className="text-[#141522]">
                  Category 3
                </option>
                <option value="category4" className="text-[#141522]">
                  Category 4
                </option>
              </select>
            </div>
            {formik.touched.category && formik.errors.category && (
              <p className="errorMessage">{formik.errors.category}</p>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="assignee" className="block mb-2 ">
              Assignee
            </label>
            <div className="">
              <select
                name="assignee"
                id="assignee"
                className="w-full border border-[#CCCCCC] text-[#CCCCCC] py-[16.5px] px-[14px] rounded-[4px]"
                onChange={formik.handleChange}
                value={formik.values.assignee}
                onBlur={formik.handleBlur}
              >
                <option value="" disabled defaultValue>
                  Select Assignee
                </option>
                <option value="assignee1" className="text-[#141522]">
                  Assignee 1
                </option>
                <option value="assignee2" className="text-[#141522]">
                  Assignee 2
                </option>
                <option value="assignee3" className="text-[#141522]">
                  Assignee 3
                </option>
                <option value="assignee4" className="text-[#141522]">
                  Assignee 4
                </option>
              </select>
            </div>
            {formik.touched.assignee && formik.errors.assignee && (
              <p className="errorMessage">{formik.errors.assignee}</p>
            )}
          </div>
        </div>
        <div className="flex-1">
          <label className="block mb-2">Mentors</label>
          <div>
            <MultiSelectDropdown setMethod={setSelectedMentors} />
          </div>
          {formik.touched.assignee && formik.errors.assignee && (
            <p className="errorMessage">{formik.errors.assignee}</p>
          )}
        </div>
        <DatePicker setSelectedDate={setSelectedDate} />
        <MultiImageUploader setSelectedImages={setSelectedImages} />
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

AddTask.propTypes = {
  setShowAddTaskModel: PropTypes.func.isRequired,
};

export default AddTask;
