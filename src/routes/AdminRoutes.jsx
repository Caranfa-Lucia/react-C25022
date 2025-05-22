import React,{ useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function AdminRoute({ children }) {
 const [shouldRedirect, setShouldRedirect] = useState(false);

   const {
    isAdminLoggedIn,
    setShowBlockedAdminModal,
    authLoading,
  } = useAppContext();

  useEffect(() => {
    if (!authLoading && !isAdminLoggedIn) {
      setShouldRedirect(true);
      setShowBlockedAdminModal(true);
    }
  }, [isAdminLoggedIn, authLoading, setShowBlockedAdminModal]);

  if (authLoading) {
    return null; 
  }
if (shouldRedirect) {
    return <Navigate to="/home" />;
  }

  return children;
}
export default AdminRoute;