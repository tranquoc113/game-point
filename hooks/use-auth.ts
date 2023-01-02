import { LoginPayload, LocalStorage } from '@/models';
import { useEffect, useState } from 'react';

// Auth --> Protected Pages
// <Auth>{children}</Auth>

export function useAuth() {
	const [pointFirst, setPoint] = useState<number>(0)
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

	function logout() {
		LocalStorage.removeNameWallet();
		setName("");
	}

	function changePoint(point: number){
		let storage_point = Number(LocalStorage.accessPoint)
		const newPoint = storage_point+=point;
		LocalStorage.setPoint(newPoint)
	}

	function getPoint():number{
		return Number(LocalStorage.accessPoint);
	}

	return {
		login,
		logout,
		name,
		changePoint,
		getPoint,
		pointFirst
	}
}