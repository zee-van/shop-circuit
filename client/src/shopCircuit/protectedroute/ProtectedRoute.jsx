import React, { useRef } from 'react'
import { useCookies } from 'react-cookie';
import { Route } from 'react-router-dom'


function ProtectedRoute({ component, path }) {
    const [cookies] = useCookies(['token']);
    const isUser = cookies.token ? true : false;

    const handleAccess = () => {
        if (isUser) {
          console.log('You need to be logged in to access this page.');
          return true;
        }
        return;
      };
    
  return (
    <Route path={isUser ? path : '/'} element={handleAccess ? component : undefined} />
  )
}

export default ProtectedRoute