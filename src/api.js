import { MOCK_ARTICLES, MOCK_COMMENTS, MOCK_USERS, MOCK_USER_RATINGS } from './mockData';

/**
 * Mock-only API layer.
 * All data lives in memory (and mockData.js). No backend required.
 */

/* ── Mutable copies so runtime changes persist during session ── */
let articles = [...MOCK_ARTICLES];
let comments = JSON.parse(JSON.stringify(MOCK_COMMENTS));
let nextCommentId = 100;
let nextArticleId = 100;
const userRatings = { ...MOCK_USER_RATINGS };

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

/* ── Simulate async delay ─────────────────────────────────── */
const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

/* ── Mock API ─────────────────────────────────────────────── */
export const api = {
    auth: {
        login: async (email, password) => {
            await delay(500);
            const user = MOCK_USERS.find((u) => u.email === email && u.password === password);
            if (!user) throw new Error('Nieprawidłowy email lub hasło.');
            const { password: _, ...safeUser } = user;
            const result = { token: `mock-token-${user.id}`, user: safeUser };
            localStorage.setItem('blog_auth', JSON.stringify(result));
            return result;
        },
        register: async (email, password, name) => {
            await delay(500);
            if (MOCK_USERS.find((u) => u.email === email)) {
                throw new Error('Konto z tym adresem email już istnieje.');
            }
            const newUser = {
                id: `u${MOCK_USERS.length + 1}`,
                email,
                password,
                name,
                role: 'user',
                avatar: null,
            };
            MOCK_USERS.push(newUser);
            const { password: _, ...safeUser } = newUser;
            const result = { token: `mock-token-${newUser.id}`, user: safeUser };
            localStorage.setItem('blog_auth', JSON.stringify(result));
            return result;
        },
    },

    articles: {
        list: async (params = {}) => {
            await delay(400);
            let result = [...articles];

            if (params.category) {
                result = result.filter((a) => a.category === params.category);
            }
            if (params.search) {
                const q = params.search.toLowerCase();
                result = result.filter(
                    (a) =>
                        a.title.toLowerCase().includes(q) ||
                        a.excerpt.toLowerCase().includes(q) ||
                        a.tags.some((t) => t.toLowerCase().includes(q))
                );
            }

            result.sort((a, b) => new Date(b.date) - new Date(a.date));

            const total = result.length;
            const page = parseInt(params.page) || 1;
            const limit = parseInt(params.limit) || 8;
            const offset = (page - 1) * limit;
            const paginated = result.slice(offset, offset + limit);

            return { articles: paginated, total, page, limit };
        },

        get: async (id) => {
            await delay(300);
            const article = articles.find((a) => a.id === id || a.id === String(id));
            if (!article) throw new Error('Artykuł nie został znaleziony.');
            // increment views
            article.views = (article.views || 0) + 1;
            // attach user rating if logged in
            const auth = getAuthData();
            const ratingKey = `${auth?.user?.id}_${id}`;
            return { ...article, userRating: userRatings[ratingKey] || 0 };
        },

        create: async (data) => {
            await delay(500);
            const auth = getAuthData();
            if (!auth) throw new Error('Musisz być zalogowany.');
            const newArticle = {
                ...data,
                id: `a${nextArticleId++}`,
                date: new Date().toISOString().split('T')[0],
                views: 0,
                rating: null,
                ratingCount: 0,
                author_id: auth.user.id,
                author_name: auth.user.name,
            };
            articles.unshift(newArticle);
            return newArticle;
        },

        update: async (id, data) => {
            await delay(400);
            const idx = articles.findIndex((a) => a.id === id);
            if (idx === -1) throw new Error('Artykuł nie został znaleziony.');
            articles[idx] = { ...articles[idx], ...data };
            return articles[idx];
        },

        delete: async (id) => {
            await delay(300);
            articles = articles.filter((a) => a.id !== id);
            return { success: true };
        },

        rate: async (id, score) => {
            await delay(200);
            const auth = getAuthData();
            if (!auth) throw new Error('Musisz być zalogowany.');
            const article = articles.find((a) => a.id === id);
            if (!article) throw new Error('Artykuł nie został znaleziony.');

            const ratingKey = `${auth.user.id}_${id}`;
            const prevRating = userRatings[ratingKey];
            userRatings[ratingKey] = score;

            if (prevRating) {
                // update existing rating
                const totalScore = (article.rating || 0) * article.ratingCount - prevRating + score;
                article.rating = totalScore / article.ratingCount;
            } else {
                // new rating
                const totalScore = (article.rating || 0) * article.ratingCount + score;
                article.ratingCount += 1;
                article.rating = totalScore / article.ratingCount;
            }

            return {
                rating: Math.round(article.rating * 10) / 10,
                ratingCount: article.ratingCount,
                userRating: score,
            };
        },
    },

    comments: {
        list: async (articleId) => {
            await delay(250);
            return { comments: comments[articleId] || [] };
        },

        create: async (articleId, content) => {
            await delay(300);
            const auth = getAuthData();
            if (!auth) throw new Error('Musisz być zalogowany.');
            const comment = {
                id: `c${nextCommentId++}`,
                article_id: articleId,
                user_id: auth.user.id,
                user_name: auth.user.name,
                content,
                created_at: Math.floor(Date.now() / 1000),
            };
            if (!comments[articleId]) comments[articleId] = [];
            comments[articleId].push(comment);
            return comment;
        },

        delete: async (articleId, commentId) => {
            await delay(200);
            if (comments[articleId]) {
                comments[articleId] = comments[articleId].filter((c) => c.id !== commentId);
            }
            return { success: true };
        },
    },

    media: {
        upload: async (file) => {
            await delay(600);
            // Create a local object URL as mock
            const url = URL.createObjectURL(file);
            return { url, filename: file.name };
        },
    },

    admin: {
        articles: async (params = {}) => {
            await delay(300);
            return api.articles.list(params);
        },
        comments: async () => {
            await delay(300);
            const all = Object.values(comments).flat();
            return { comments: all };
        },
        hideComment: async (id, hidden = true) => {
            await delay(200);
            return { success: true };
        },
    },
};
