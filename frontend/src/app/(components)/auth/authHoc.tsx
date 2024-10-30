'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loader from '../loader';

type AuthHOCProps = {
  children: React.ReactNode;
  role: 'admin' | 'user' | 'company';
};

export default function AuthHOC({ children, role }: AuthHOCProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Loading state for auth check

  useEffect(() => {
    const tokenKey = role === 'admin' ? 'adminToken' : role === 'user' ? 'authToken' : 'companyToken';
    const token = localStorage.getItem(tokenKey);
    let redirectTo;

    // If no token, redirect; otherwise, set loading to false
    if (!token) {
      redirectTo = role === 'admin' ? '/admin/login' : role === 'user' ? '/login' : '/company/login';
      router.push(redirectTo);
      setLoading(false)
    } else {
      setLoading(false); // Auth check complete, ready to render content
    }
  }, [role, router]);

  // Render a placeholder (like a loading spinner) until auth check is complete
  if (loading) {
    return <Loader/>;
  }

  // Render the protected content once authenticated
  return <>{children}</>;
}
