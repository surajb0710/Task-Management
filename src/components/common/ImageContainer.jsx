import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { getUserByIdApi } from '../../api/apiService';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ImageContainer = ({ assignee }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const user = await getUserByIdApi(assignee);

      setImageUrl(user.imageUrl);
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
    </div>
  );
};

ImageContainer.propTypes = {
  assignee: PropTypes.string.isRequired,
};

export default ImageContainer;
