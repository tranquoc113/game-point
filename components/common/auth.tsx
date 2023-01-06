import { useAuth } from "@/hooks";
import { useWallet } from "@meshsdk/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface AuthProps {
  children: any;
}
export function Auth({ children }: AuthProps) {
  const {connected} = useWallet();
  const router = useRouter();


  useEffect(() => {
    console.log("connect-------",connected)
    if (!connected) router.push('/')
  }, [router]);

  if (!connected) return <p>Loading ...</p>


  return <div>{children}</div>;
}
