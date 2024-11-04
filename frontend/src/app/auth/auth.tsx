'use client'
import { useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
    const router = useRouter();
    
    useLayoutEffect(() => {
        const token = false

        if (!token) {
            
            router.push('/login');
        }
    }, [router]);
};

export default useAuth;