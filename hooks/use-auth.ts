import { LoginPayload, LocalStorage } from '@/models';
import { useEffect, useState } from 'react';

// Auth --> Protected Pages
// <Auth>{children}</Auth>

export function useAuth() {
	const [address, setAddress] = useState<string | null>("")

	useEffect(()=>{
		setAddress(LocalStorage.accessAdress)
	},[])
	// const address =  new LocalStorage.accessAdress
	// const point = LocalStorage.accessPoint

	function login(address: string) {
		LocalStorage.setAddress(address);
	}

	async function logout() {
		// await authApi.logout()
	}

	return {
		address,
		login,
		logout,
	}
}