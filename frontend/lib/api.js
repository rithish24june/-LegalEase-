const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchApi(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!res.ok) {
      const errorText = await res.text();
      let errorJson = {};
      try { errorJson = JSON.parse(errorText); } catch(e) {}
      throw new Error(errorJson.detail || `Server returned ${res.status}`);
    }

    // Return blob if disposition attachment or octet stream
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/pdf') || contentType.includes('application/vnd') || contentType.includes('attachment')) {
      return await res.blob();
    }

    return await res.json();
  } catch (err) {
    console.warn(`API call failed for ${endpoint}:`, err.message);
    throw err;
  }
}

// Local Session & Auth Helpers
export const getStoredUser = () => {
  if (typeof window === 'undefined') return { name: 'Alex Mercer', email: 'alex@legalease.ai', company: 'LegalEase Inc.' };
  const u = localStorage.getItem('legalease_user');
  if (u) {
    try { return JSON.parse(u); } catch(e) {}
  }
  return { name: 'Alex Mercer', email: 'alex@legalease.ai', company: 'LegalEase Inc.' };
};

export const setStoredUser = (user) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('legalease_user', JSON.stringify(user));
  }
};
