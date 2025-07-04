'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/auth/logout', {
            method: 'POST',
        });

        router.refresh();
    };

    return (
        <Button onClick={handleLogout} variant="destructive" className='absolute top-4 right-4 cursor-pointer'>
            Logout
        </Button>
    );
}
