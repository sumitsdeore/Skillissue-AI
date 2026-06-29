const AUTH_EMAIL_KEY = "skillissue_user_email";
const AUTH_NAME_KEY = "skillissue_user_name";

export function getStoredAuth(): { email: string | null; name: string | null } {
  try {
    return {
      email: sessionStorage.getItem(AUTH_EMAIL_KEY),
      name: sessionStorage.getItem(AUTH_NAME_KEY),
    };
  } catch {
    return { email: null, name: null };
  }
}

export function saveAuth(email: string, name: string) {
  sessionStorage.setItem(AUTH_EMAIL_KEY, email);
  sessionStorage.setItem(AUTH_NAME_KEY, name);
}

export function clearAuth() {
  sessionStorage.removeItem(AUTH_EMAIL_KEY);
  sessionStorage.removeItem(AUTH_NAME_KEY);
}

/** Drop legacy persistent login so each visitor signs in fresh per session. */
export function clearLegacyAuth() {
  localStorage.removeItem(AUTH_EMAIL_KEY);
  localStorage.removeItem(AUTH_NAME_KEY);
}
