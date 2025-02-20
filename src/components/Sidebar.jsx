import { Link, useLocation } from 'react-router-dom';
import { sidebar } from '../assets/assets';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import PropTypes from 'prop-types';

const Sidebar = ({ setShowAddTaskModel }) => {
  const location = useLocation();

  return (
    <div className="w-[254px] h-screen p-8 bg-white fixed">
      <Link to="/">
        <div className="flex gap-3 w-full mb-[60px] items-center">
          <img src={sidebar.logo} alt="" className="w-10 h-10" />
          <p className="text-[32px] text-[#141522] font-semibold">DNX</p>
        </div>
      </Link>
      <ul className="flex flex-col gap-6">
        <Link to="/">
          <li
            className={`${
              location.pathname === '/' && 'rounded-[10px] bg-[#F5F5F7]'
            } px-5 py-2.5 flex gap-3`}
          >
            <img
              src={
                location.pathname === '/'
                  ? sidebar.overview_dark
                  : sidebar.overview
              }
              alt=""
              className="w-6 h-6"
            />
            <p
              className={`${
                location.pathname === '/' && 'text-[#141522]'
              } text-sm font-semibold text-[#8E92BC]`}
            >
              Overview
            </p>
          </li>
        </Link>
        <Link to="/tasks">
          <li
            className={`${
              location.pathname === '/tasks' && 'rounded-[10px] bg-[#F5F5F7]'
            } px-5 py-2.5 flex justify-between`}
          >
            <div className="flex gap-3">
              <img
                src={
                  location.pathname === '/tasks'
                    ? sidebar.book_dark
                    : sidebar.book
                }
                alt=""
                className="w-6 h-6"
              />
              <p
                className={`${
                  location.pathname === '/tasks' && 'text-[#141522]'
                } text-sm font-semibold text-[#8E92BC]`}
              >
                Task
              </p>
            </div>
            <div onClick={() => setShowAddTaskModel(true)}>
              <AddCircleOutlineOutlinedIcon />
            </div>
          </li>
        </Link>
        <Link to="/mentors">
          <li
            className={`${
              location.pathname === '/mentors' && 'rounded-[10px] bg-[#F5F5F7]'
            } px-5 py-2.5 flex justify-between`}
          >
            <div className="flex gap-3">
              <img
                src={
                  location.pathname === '/mentors'
                    ? sidebar.mentor_dark
                    : sidebar.mentor
                }
                alt=""
                className="w-6 h-6"
              />
              <p
                className={`${
                  location.pathname === '/mentors' && 'text-[#141522]'
                } text-sm font-semibold text-[#8E92BC]`}
              >
                Mentors
              </p>
            </div>
            <AddCircleOutlineOutlinedIcon />
          </li>
        </Link>
        <Link to="/messages">
          <li
            className={`${
              location.pathname === '/messages' && 'rounded-[10px] bg-[#F5F5F7]'
            } px-5 py-2.5 flex gap-3`}
          >
            <img
              src={
                location.pathname === '/messages'
                  ? sidebar.message_dark
                  : sidebar.message
              }
              alt=""
              className="w-6 h-6 "
            />
            <p
              className={`${
                location.pathname === '/messages' && 'text-[#141522]'
              } text-sm font-semibold text-[#8E92BC]`}
            >
              Message
            </p>
          </li>
        </Link>
        <Link to="/settings">
          <li
            className={`${
              location.pathname === '/settings' && 'rounded-[10px] bg-[#F5F5F7]'
            } px-5 py-2.5 flex gap-3`}
          >
            <img
              src={
                location.pathname === '/settings'
                  ? sidebar.setting_dark
                  : sidebar.setting
              }
              alt=""
              className="w-6 h-6 "
            />
            <p
              className={`${
                location.pathname === '/settings' && 'text-[#141522]'
              } text-sm font-semibold text-[#8E92BC]`}
            >
              Settings
            </p>
          </li>
        </Link>
      </ul>
      <div></div>
    </div>
  );
};

Sidebar.propTypes = {
  setShowAddTaskModel: PropTypes.func.isRequired,
};

export default Sidebar;
