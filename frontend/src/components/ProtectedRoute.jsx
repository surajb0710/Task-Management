import { Navigate } from 'react-router-dom';
import useAuth from '../context/useAuth';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
