import { LoginPayload, LocalStorage } from '@/models';

// Auth --> Protected Pages
// <Auth>{children}</Auth>

export function useAuth() {
	const address = LocalStorage.accessAdress
	const point = LocalStorage.accessPoint

	function login(address: string) {
		
	}

	async function logout() {
		// await authApi.logout()
	}

	return {
		address,
		login,
		logout,
		point
	}
}