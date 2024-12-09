import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loader from '../loader/loader';

enum Role {
  Admin = 'admin',
  User = 'user',
  Company = 'company'
}

type AuthHOCProps = {
  children: React.ReactNode;
  role: Role;
  isAuthPage?: boolean; // Optional prop to specify if this is the login page
};

export default function AuthHOC({ children, role, isAuthPage = false }: AuthHOCProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenKey = role === Role.Admin ? 'adminToken' : role === Role.User ? 'authUserToken' : 'companyToken';
    const token = localStorage.getItem(tokenKey);

    if (isAuthPage) {
      // If on login page and token exists, redirect to main content page
      if (token) {
        const redirectTo = role === Role.Admin ? '/admin/dashboard' : role === Role.User ? '/' : '/company';
        router.push(redirectTo);
      } else {
        setLoading(false); // Allow access to the login page if no token is found
      }
    } else {
      // If on a protected page and no token, redirect to the login page
      if (!token) {
        const redirectTo = role === Role.Admin ? '/admin/login' : role === Role.User ? '/login' : '/company/login';
        router.push(redirectTo);
      } else {
        setLoading(false); // Auth check complete, ready to render protected content
      }
    }
  }, [role, router, isAuthPage]);

  // Render Loader while checking authentication
  if (loading) {
    return <Loader />;
  }

  // Render the content once authenticated or allow access to the login page if unauthenticated
  return <>{children}</>;
}
