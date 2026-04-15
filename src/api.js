const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8787';

export function getAuthData() {
    try {
        const data = localStorage.getItem('blog_auth');
        return data ? JSON.parse(data) : null;
    } catch {
        return null;
    }
}

export function isAdmin() {
    return getAuthData()?.user?.role === 'admin';
}

export function isLoggedIn() {
    return !!getAuthData()?.token;
}

export function logout() {
    localStorage.removeItem('blog_auth');
}

async function request(path, options = {}) {
    const auth = getAuthData();
    const headers = {
        'Content-Type': 'application/json',
        ...(auth?.token ? { Authorization: `Bearer ${auth.token}` } : {}),
        ...(options.headers || {}),
    };

    const res = await fetch(`${API_URL}${path}`, { ...options, headers });

    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
        throw new Error(err.error || `HTTP ${res.status}`);
    }

    return res.json();
}

export const api = {
    auth: {
        login: (email, password) =>
            request('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            }),
        register: (email, password, name) =>
            request('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({ email, password, name }),
            }),
    },

    articles: {
        list: (params = {}) => {
            const qs = new URLSearchParams(
                Object.fromEntries(Object.entries(params).filter(([, v]) => v != null && v !== ''))
            ).toString();
            return request(`/api/articles${qs ? `?${qs}` : ''}`);
        },
        get: (id) => request(`/api/articles/${id}`),
        create: (data) =>
            request('/api/articles', { method: 'POST', body: JSON.stringify(data) }),
        update: (id, data) =>
            request(`/api/articles/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
        delete: (id) => request(`/api/articles/${id}`, { method: 'DELETE' }),
        rate: (id, score) =>
            request(`/api/articles/${id}/rate`, {
                method: 'POST',
                body: JSON.stringify({ score }),
            }),
    },

    comments: {
        list: (articleId) => request(`/api/articles/${articleId}/comments`),
        create: (articleId, content) =>
            request(`/api/articles/${articleId}/comments`, {
                method: 'POST',
                body: JSON.stringify({ content }),
            }),
        delete: (articleId, commentId) =>
            request(`/api/articles/${articleId}/comments/${commentId}`, { method: 'DELETE' }),
    },

    media: {
        upload: async (file) => {
            const auth = getAuthData();
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch(`${API_URL}/api/media/upload`, {
                method: 'POST',
                headers: auth?.token ? { Authorization: `Bearer ${auth.token}` } : {},
                body: formData,
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
                throw new Error(err.error || `HTTP ${res.status}`);
            }
            return res.json();
        },
    },

    admin: {
        articles: (params = {}) => {
            const qs = new URLSearchParams(params).toString();
            return request(`/api/admin/articles${qs ? `?${qs}` : ''}`);
        },
        comments: () => request('/api/admin/comments'),
        hideComment: (id, hidden = true) =>
            request(`/api/admin/comments/${id}/hide`, {
                method: 'PATCH',
                body: JSON.stringify({ hidden }),
            }),
    },
};
