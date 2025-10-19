/**
 * Authentication utility functions
 * Centralizes token handling and auth-related operations
 */

export const getAuthToken = (): string | null => {
  try {
    return localStorage.getItem('jobportal_token');
  } catch (error) {
    console.warn('Failed to access localStorage for auth token');
    return null;
  }
};

export const setAuthToken = (token: string): void => {
  try {
    localStorage.setItem('jobportal_token', token);
  } catch (error) {
    console.warn('Failed to store auth token in localStorage');
  }
};

export const removeAuthToken = (): void => {
  try {
    localStorage.removeItem('jobportal_token');
  } catch (error) {
    console.warn('Failed to remove auth token from localStorage');
  }
};

export const getAuthHeaders = (): { Authorization: string } | {} => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  if (!token) return false;

  try {
    // Basic JWT validation - check if token exists and isn't expired
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
  } catch (error) {
    // Invalid token format
    return false;
  }
};

export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('jobportal_user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.warn('Failed to parse user data from localStorage');
    return null;
  }
};

export const setCurrentUser = (user: any): void => {
  try {
    localStorage.setItem('jobportal_user', JSON.stringify(user));
  } catch (error) {
    console.warn('Failed to store user data in localStorage');
  }
};

export const clearAuth = (): void => {
  removeAuthToken();
  try {
    localStorage.removeItem('jobportal_user');
    localStorage.removeItem('jobportal_applied');
  } catch (error) {
    console.warn('Failed to clear auth data from localStorage');
  }
};