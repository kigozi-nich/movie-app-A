// Simple localStorage helper to persist common user settings
export const LS_KEYS = {
  WATCHLIST: 'watchlist',
  LAST_QUERY: 'lastSearchQuery',
  PREFERRED_GENRES: 'preferredGenres',
  LAST_PAGE: 'lastPage',
  THEME: 'siteTheme',
};

export const saveWatchlist = (list: any[]) => {
  try {
    localStorage.setItem(LS_KEYS.WATCHLIST, JSON.stringify(list));
  } catch {}
};

export const getWatchlistLS = (): any[] => {
  try {
    const d = localStorage.getItem(LS_KEYS.WATCHLIST);
    return d ? JSON.parse(d) : [];
  } catch { return []; }
};

export const saveLastQuery = (q: string) => {
  try { localStorage.setItem(LS_KEYS.LAST_QUERY, q); } catch {}
};

export const getLastQuery = (): string => {
  try { return localStorage.getItem(LS_KEYS.LAST_QUERY) || ''; } catch { return ''; }
};

export const savePreferredGenres = (genres: string[]) => {
  try { localStorage.setItem(LS_KEYS.PREFERRED_GENRES, JSON.stringify(genres)); } catch {}
};

export const getPreferredGenres = (): string[] => {
  try { const d = localStorage.getItem(LS_KEYS.PREFERRED_GENRES); return d ? JSON.parse(d) : []; } catch { return []; }
};

export const saveLastPage = (p: number) => {
  try { localStorage.setItem(LS_KEYS.LAST_PAGE, String(p)); } catch {}
};

export const getLastPage = (): number => {
  try { const v = localStorage.getItem(LS_KEYS.LAST_PAGE); return v ? parseInt(v, 10) : 1; } catch { return 1; }
};

export const saveTheme = (theme: string) => {
  try { localStorage.setItem(LS_KEYS.THEME, theme); } catch {}
};

export const getTheme = (): string => {
  try { return localStorage.getItem(LS_KEYS.THEME) || 'light'; } catch { return 'light'; }
};
