import { LoginPayload, LocalStorage } from '@/models';
import { useEffect, useState } from 'react';

// Auth --> Protected Pages
// <Auth>{children}</Auth>

export function useAuth() {
	const [point, setPoint] = useState<number>(0)
	const [name, setName] = useState<string>("")

	useEffect(()=>{
		const storage_point = LocalStorage.accessPoint
		if(storage_point) setPoint(Number(storage_point));
		const nameWallet = LocalStorage.accessNameWallet
		if(nameWallet) setName(nameWallet)
	},[])

	function login(name: string) {
		LocalStorage.setNameWallet(name)
	}

	async function logout() {
		// await authApi.logout()
	}

	return {
		point,
		login,
		logout,
		name,
	}
}