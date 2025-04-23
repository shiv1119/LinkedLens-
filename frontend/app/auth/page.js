"use client"
import { useEffect} from 'react';
import Auth from "@/components/Auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';


export default function Home() {
  const router = useRouter();
    const { status } = useSession();
    
    const isAuthenticated = status === 'authenticated';
  
    useEffect(() => {
      if (isAuthenticated) {
        router.replace('/');
      }
    }, [isAuthenticated, router]);

  return (
    <div>
      <Auth />
    </div>
  );
}
