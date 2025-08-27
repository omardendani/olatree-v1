// src/hooks/useAuthUser.js

export function useAuthUser() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload; // ex: { id, username, email }
    } catch {
        return null;
    }
}
