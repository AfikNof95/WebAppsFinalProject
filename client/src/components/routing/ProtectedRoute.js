import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate({ pathname: '/login' }, { state: { redirect: '/checkout' } });
    }
  }, [currentUser]);

  return children;
};

export default ProtectedRoute;
