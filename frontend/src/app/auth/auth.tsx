import React, { ComponentType, useEffect } from 'react';
import { useRouter } from 'next/router';

// Auth HOC
export default function Auth<T extends React.JSX.IntrinsicAttributes>(WrappedComponent: ComponentType<T>) {
  const AuthenticatedPage = (props: T) => {
    const router = useRouter();
    const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('authToken');

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login'); // Redirect if not authenticated
      }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
      return null; // Show nothing or a loading spinner while redirecting
    }

    // Pass props to the WrappedComponent, including any intrinsic attributes
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedPage;
}
