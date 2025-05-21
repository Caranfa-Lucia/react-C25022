import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoutes({ children }) {
  const [shouldRedirect, setShouldRedirect] = useState(false);

   const {
    isLoggedIn,
    setShowBlockedModal,
    authLoading,
  } = useAppContext();

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      setShouldRedirect(true);
      setShowBlockedModal(true);
    }
  }, [isLoggedIn, authLoading, setShowBlockedModal]);

  if (authLoading) {
    return null; 
  }

  if (shouldRedirect) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default ProtectedRoutes;