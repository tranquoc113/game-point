import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface AuthProps {
  children: any;
}
export function Auth({ children }: AuthProps) {
  const { address } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!address) router.push('/login')
  }, [router, address]);

  if (!address) return <p>Loading ...</p>


  return <div>{children}</div>;
}
