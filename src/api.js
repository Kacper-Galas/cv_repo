const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8787';

/* ── Auth helpers ─────────────────────────────────────────── */
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

/* ── Fetch helper ─────────────────────────────────────────── */
async function request(path, options = {}) {
    const auth = getAuthData();
    const headers = {
        'Content-Type': 'application/json',
        ...(auth?.token ? { Authorization: `Bearer ${auth.token}` } : {}),
        ...(options.headers || {}),
    };

    const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data?.error || `HTTP ${res.status}`);
    }

    return data;
}

/* ── Real API ─────────────────────────────────────────────── */
export const api = {
    auth: {
        login: async (email, password) => {
            const result = await request('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });
            localStorage.setItem('blog_auth', JSON.stringify(result));
            return result;
        },
        register: async (email, password, name) => {
            const result = await request('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({ email, password, name }),
            });
            localStorage.setItem('blog_auth', JSON.stringify(result));
            return result;
        },
    },

    articles: {
        list: async (params = {}) => {
            const qs = new URLSearchParams();
            if (params.category && params.category !== 'Wszystkie') qs.set('category', params.category);
            if (params.search) qs.set('search', params.search);
            if (params.page) qs.set('page', String(params.page));
            if (params.limit) qs.set('limit', String(params.limit));
            return request(`/api/articles?${qs.toString()}`);
        },

        get: async (id) => {
            return request(`/api/articles/${id}`);
        },

        create: async (data) => {
            return request('/api/articles', {
                method: 'POST',
                body: JSON.stringify(data),
            });
        },

        update: async (id, data) => {
            return request(`/api/articles/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
            });
        },

        delete: async (id) => {
            return request(`/api/articles/${id}`, { method: 'DELETE' });
        },

        rate: async (id, score) => {
            return request(`/api/articles/${id}/rate`, {
                method: 'POST',
                body: JSON.stringify({ score }),
            });
        },
    },

    comments: {
        list: async (articleId) => {
            return request(`/api/articles/${articleId}/comments`);
        },

        create: async (articleId, content) => {
            return request(`/api/articles/${articleId}/comments`, {
                method: 'POST',
                body: JSON.stringify({ content }),
            });
        },

        delete: async (articleId, commentId) => {
            return request(`/api/articles/${articleId}/comments/${commentId}`, {
                method: 'DELETE',
            });
        },
    },

    media: {
        upload: async (file) => {
            const auth = getAuthData();
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch(`${BASE_URL}/api/media/upload`, {
                method: 'POST',
                headers: auth?.token ? { Authorization: `Bearer ${auth.token}` } : {},
                body: formData,
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
            return data;
        },
    },

    admin: {
        articles: async (params = {}) => {
            const qs = new URLSearchParams();
            if (params.page) qs.set('page', String(params.page));
            if (params.limit) qs.set('limit', String(params.limit));
            return request(`/api/admin/articles?${qs.toString()}`);
        },
        comments: async () => {
            return request('/api/admin/comments');
        },
        hideComment: async (id, hidden = true) => {
            return request(`/api/admin/comments/${id}/hide`, {
                method: 'PATCH',
                body: JSON.stringify({ hidden }),
            });
        },
    },
};
