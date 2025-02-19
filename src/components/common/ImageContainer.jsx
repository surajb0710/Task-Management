import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { getUserByIdApi } from '../../api/apiService';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const LikedBy = ({ assignee }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      console.log('---assignee----', assignee);
      const user = await getUserByIdApi(assignee);

      setImageUrl(user.imageUrl);

      console.log('---user----', user);
    };
    fetchTasks(assignee);
  }, [assignee]);

  return (
    <div className="flex gap-1">
      {imageUrl !== '' ? (
        <img src={imageUrl} alt="" className="h-6 w-6 rounded-full" />
      ) : (
        <AccountCircleOutlinedIcon />
      )}
      {/* {persons.person2 && (
        <img
          src={persons.person2}
          alt=""
          className="h-6 w-6 rounded-full -ml-2"
        />
      )}
      {persons.person3 && (
        <img
          src={persons.person3}
          alt=""
          className="h-6 w-6 rounded-full -ml-2"
        />
      )}
      {persons.person4 && (
        <img
          src={persons.person4}
          alt=""
          className="h-6 w-6 rounded-full -ml-2"
        />
      )}
      {persons.person5 && (
        <img
          src={persons.person5}
          alt=""
          className="h-6 w-6 rounded-full -ml-2"
        />
      )} */}
    </div>
  );
};

LikedBy.propTypes = {
  assignee: PropTypes.string.isRequired,
};

export default LikedBy;
