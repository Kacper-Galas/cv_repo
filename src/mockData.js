/**
 * Centralized mock data for the blog.
 * All API calls fall back to these mocks when the backend is unavailable.
 */

/* ── Mock user account ────────────────────────────────────── */
export const MOCK_USERS = [
    {
        id: 'u1',
        email: 'admin@gmail.com',
        password: 'admin',
        name: 'Kacper Galas',
        role: 'admin',
        avatar: null,
    },
    {
        id: 'u2',
        email: 'jan@blog.pl',
        password: 'jan123',
        name: 'Jan Kowalski',
        role: 'user',
        avatar: null,
    },
];

/* ── Mock articles ────────────────────────────────────────── */
export const MOCK_ARTICLES = [
    {
        id: 'a1',
        title: 'React 19 – najważniejsze zmiany',
        category: 'React',
        date: '2026-03-20',
        readTime: 6,
        thumbnail: 'https://picsum.photos/seed/react19/600/340',
        excerpt:
            'React 19 wprowadza kompilator, Actions, nowe hooki i znacznie lepszą wydajność renderowania. Sprawdzamy, co się zmienia i jak migrować projekty.',
        tags: ['React', 'Frontend', 'Hooks'],
        views: 142,
        rating: 4.3,
        ratingCount: 12,
        userRating: 0,
        author_id: 'u1',
        author_name: 'Kacper Galas',
        chapters: [
            {
                title: 'Kompilator i Actions',
                blocks: [
                    {
                        type: 'text',
                        content:
                            'React 19 to jedna z największych aktualizacji frameworka od lat. Nowy kompilator React automatycznie optymalizuje re-rendery, eliminując potrzebę ręcznego stosowania useMemo i useCallback w wielu przypadkach.',
                    },
                    {
                        type: 'text',
                        content:
                            'Actions to nowy wzorzec obsługi formularzy i mutacji danych — pozwala deklaratywnie definiować operacje asynchroniczne z wbudowanym śledzeniem stanu pending, error i optimistic updates.',
                    },
                    {
                        type: 'code',
                        language: 'jsx',
                        content: `function UpdateName() {
  const [error, submitAction, isPending] = useActionState(
    async (prev, formData) => {
      const name = formData.get("name");
      const error = await updateName(name);
      if (error) return error;
      redirect("/profile");
    },
    null
  );

  return (
    <form action={submitAction}>
      <input name="name" />
      <button disabled={isPending}>Zapisz</button>
      {error && <p>{error}</p>}
    </form>
  );
}`,
                    },
                ],
            },
            {
                title: 'Nowe hooki',
                blocks: [
                    {
                        type: 'text',
                        content:
                            'useFormStatus daje dostęp do stanu wysyłania formularza bez konieczności przekazywania propsów w dół drzewa. useOptimistic pozwala natychmiast pokazać użytkownikowi zaktualizowane dane, zanim serwer potwierdzi zmianę.',
                    },
                    {
                        type: 'note',
                        variant: 'info',
                        title: 'Wskazówka',
                        message: 'useOptimistic automatycznie cofa stan, jeśli akcja serwera się nie powiedzie — nie musisz pisać logiki rollbacku ręcznie.',
                    },
                ],
            },
            {
                title: 'Wydajność i migracja',
                blocks: [
                    {
                        type: 'text',
                        content:
                            'Wydajność renderowania wzrosła znacząco dzięki automatycznemu batchingowi i współbieżnemu renderowaniu. Suspense działa teraz płynniej z Server Components.',
                    },
                    {
                        type: 'table',
                        headers: ['Funkcja', 'React 18', 'React 19'],
                        rows: [
                            ['Kompilator', 'Brak', 'Automatyczna optymalizacja'],
                            ['Actions', 'Brak', 'Wbudowane'],
                            ['useFormStatus', 'Brak', 'Nowy hook'],
                            ['Streaming SSR', 'Podstawowy', 'Ulepszony'],
                        ],
                    },
                    {
                        type: 'text',
                        content:
                            'Migracja z React 18 jest relatywnie prosta — większość zmian jest kompatybilna wstecz, choć warto przetestować komponenty korzystające z useEffect.',
                    },
                ],
            },
        ],
    },
    {
        id: 'a2',
        title: 'Node.js + Express – REST API od podstaw',
        category: 'Node.js',
        date: '2026-03-15',
        readTime: 10,
        thumbnail: 'https://picsum.photos/seed/nodejs-api/600/340',
        excerpt:
            'Krok po kroku buduję REST API z autoryzacją JWT, walidacją schematów Zod i bazą danych MongoDB Atlas.',
        tags: ['Node.js', 'Backend', 'Express'],
        views: 89,
        rating: 4.7,
        ratingCount: 8,
        userRating: 0,
        author_id: 'u1',
        author_name: 'Kacper Galas',
        chapters: [
            {
                title: 'Struktura projektu',
                blocks: [
                    {
                        type: 'text',
                        content:
                            'Budowanie REST API w Node.js z Express to fundament backendu webowego. Zaczynamy od struktury projektu: routes, controllers, middleware i models — czysty podział odpowiedzialności ułatwia skalowanie.',
                    },
                    {
                        type: 'code',
                        language: 'bash',
                        content: `mkdir my-api && cd my-api
npm init -y
npm install express mongoose dotenv cors helmet
npm install -D nodemon`,
                    },
                    {
                        type: 'code',
                        language: 'js',
                        content: `// src/index.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './db.js';
import { authRouter } from './routes/auth.js';
import { articleRouter } from './routes/articles.js';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/articles', articleRouter);

connectDB().then(() => {
    app.listen(3000, () => console.log('Server running on :3000'));
});`,
                    },
                ],
            },
            {
                title: 'Autoryzacja JWT',
                blocks: [
                    {
                        type: 'text',
                        content:
                            'Autoryzacja JWT pozwala na bezstanowe uwierzytelnianie użytkowników. Tworzymy endpointy /register i /login, które generują tokeny z określonym czasem życia.',
                    },
                    {
                        type: 'note',
                        variant: 'warning',
                        title: 'Bezpieczeństwo',
                        message: 'Nigdy nie przechowuj tokenów JWT w localStorage na produkcji — używaj httpOnly cookies. W tym tutorialu localStorage jest uproszczeniem.',
                    },
                    {
                        type: 'quote',
                        content: 'Simple is secure. Complexity is the enemy of security.',
                        author: 'Bruce Schneier',
                    },
                ],
            },
            {
                title: 'Walidacja i baza danych',
                blocks: [
                    {
                        type: 'text',
                        content:
                            'Walidacja danych wejściowych z Zod zapewnia bezpieczeństwo typów na poziomie runtime. MongoDB Atlas jako baza danych w chmurze eliminuje potrzebę zarządzania infrastrukturą.',
                    },
                    {
                        type: 'code',
                        language: 'js',
                        content: `import { z } from 'zod';

const articleSchema = z.object({
    title: z.string().min(3).max(200),
    category: z.enum(['React', 'Node.js', 'CSS', 'TypeScript', 'Inne']),
    excerpt: z.string().min(10).max(500),
    tags: z.array(z.string()).max(5),
});

export function validate(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ error: result.error.flatten() });
        }
        req.validated = result.data;
        next();
    };
}`,
                    },
                ],
            },
        ],
    },
    {
        id: 'a3',
        title: 'CSS Grid vs Flexbox – kiedy co wybrać?',
        category: 'CSS',
        date: '2026-03-10',
        readTime: 5,
        thumbnail: 'https://picsum.photos/seed/cssgrid-flex/600/340',
        excerpt:
            'Praktyczny poradnik, który rozwiewa wątpliwości dotyczące wyboru pomiędzy CSS Grid a Flexbox w codziennych layoutach.',
        tags: ['CSS', 'Frontend', 'Layout'],
        views: 213,
        rating: 4.1,
        ratingCount: 19,
        userRating: 0,
        author_id: 'u1',
        author_name: 'Kacper Galas',
        chapters: [
            {
                title: 'Flexbox vs Grid – podstawy',
                blocks: [
                    {
                        type: 'text',
                        content:
                            'Flexbox i CSS Grid to dwa filary nowoczesnego layoutu. Flexbox działa w jednym wymiarze — idealny do nawigacji, toolbarów i centrowania treści. Grid operuje w dwóch wymiarach — kolumny i wiersze.',
                    },
                    {
                        type: 'image',
                        url: 'https://picsum.photos/seed/gridvsflex/800/400',
                        alt: 'Grid vs Flexbox porównanie',
                        caption: 'Porównanie jednowymiarowego Flexbox z dwuwymiarowym Grid',
                    },
                ],
            },
            {
                title: 'Praktyczne zastosowania',
                blocks: [
                    {
                        type: 'text',
                        content:
                            'W praktyce najczęściej używam Grid dla makro-layoutu strony (header, sidebar, main, footer) i Flexbox dla mikro-layoutu wewnątrz komponentów.',
                    },
                    {
                        type: 'code',
                        language: 'css',
                        content: `.page {
  display: grid;
  grid-template-columns: 280px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  min-height: 100vh;
}

.nav {
  display: flex;
  align-items: center;
  gap: 12px;
}`,
                    },
                ],
            },
            {
                title: 'Subgrid i współpraca',
                blocks: [
                    {
                        type: 'text',
                        content:
                            'Subgrid pozwala zagnieżdżonym elementom wyrównać się do siatki rodzica. Eliminuje to mnóstwo hacków z paddingiem i marginesem.',
                    },
                    {
                        type: 'note',
                        variant: 'success',
                        title: 'Złota zasada',
                        message: 'Grid dla struktury strony, Flexbox dla wycentrowania i rozkładu wewnątrz komponentów. Nie wybieraj jednego na siłę — oba świetnie współpracują.',
                    },
                    {
                        type: 'table',
                        headers: ['Cecha', 'Flexbox', 'CSS Grid'],
                        rows: [
                            ['Wymiary', '1D', '2D'],
                            ['Idealne do', 'Nawigacja, toolbary', 'Layouty stron, dashboardy'],
                            ['Auto-placement', 'Ograniczony', 'Zaawansowany'],
                            ['Subgrid', 'Nie', 'Tak'],
                            ['Gap', 'Tak', 'Tak'],
                        ],
                    },
                ],
            },
        ],
    },
];

/* ── Mock comments ────────────────────────────────────────── */
export const MOCK_COMMENTS = {
    a1: [
        {
            id: 'c1',
            article_id: 'a1',
            user_id: 'u2',
            user_name: 'Jan Kowalski',
            content: 'Świetny artykuł! Kompilator w React 19 to game-changer. Czy masz doświadczenie z migracją dużego projektu?',
            created_at: Math.floor(new Date('2026-03-21T10:30:00').getTime() / 1000),
        },
        {
            id: 'c2',
            article_id: 'a1',
            user_id: 'u1',
            user_name: 'Kacper Galas',
            content: 'Dzięki! Migrowałem projekt ~200 komponentów — większość zadziałała od razu. Jedyny problem to custom hooks z useEffect, które wymagały drobnych poprawek.',
            created_at: Math.floor(new Date('2026-03-21T14:15:00').getTime() / 1000),
        },
        {
            id: 'c3',
            article_id: 'a1',
            user_id: 'u2',
            user_name: 'Jan Kowalski',
            content: 'Aż ciężko uwierzyć że useMemo i useCallback będą zbędne. Czekam na benchmark z większymi appkami.',
            created_at: Math.floor(new Date('2026-03-22T09:00:00').getTime() / 1000),
        },
    ],
    a2: [
        {
            id: 'c4',
            article_id: 'a2',
            user_id: 'u2',
            user_name: 'Jan Kowalski',
            content: 'Fajne! Zod jest dużo lepszy od Joi — TypeScript-first i lżejszy. Polecam też tRPC jako alternatywę dla REST.',
            created_at: Math.floor(new Date('2026-03-16T08:20:00').getTime() / 1000),
        },
    ],
    a3: [
        {
            id: 'c5',
            article_id: 'a3',
            user_id: 'u2',
            user_name: 'Jan Kowalski',
            content: 'Nareszcie ktoś ładnie wyjaśnił kiedy Grid a kiedy Flex. Tabela na końcu to złoto 👌',
            created_at: Math.floor(new Date('2026-03-11T12:00:00').getTime() / 1000),
        },
        {
            id: 'c6',
            article_id: 'a3',
            user_id: 'u1',
            user_name: 'Kacper Galas',
            content: 'Cieszę się! Subgrid to moim zdaniem najciekawsza nowość w CSS od lat. Wsparcie przeglądarek jest już świetne.',
            created_at: Math.floor(new Date('2026-03-11T15:45:00').getTime() / 1000),
        },
    ],
};

/* ── Mock ratings per user ────────────────────────────────── */
export const MOCK_USER_RATINGS = {};
