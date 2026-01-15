import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext(null);

function keyFor(user) {
  return user?._id ? `techparts:favs:${user._id}` : "techparts:favs:guest";
}

function safeParse(raw) {
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function asId(v) {
  return String(v ?? "");
}

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  // carrega quando muda de usuário
  useEffect(() => {
    const raw = localStorage.getItem(keyFor(user));
    const parsed = safeParse(raw);
    setFavorites(Array.isArray(parsed) ? parsed : []);
  }, [user?._id]);

  // salva sempre que muda
  useEffect(() => {
    localStorage.setItem(keyFor(user), JSON.stringify(favorites));
  }, [favorites, user?._id]);

  function isFav(id) {
    const target = asId(id);
    return favorites.some((p) => asId(p.id) === target);
  }

  function toggleFavorite(product) {
    const pid = asId(product?.id);
    if (!pid) return;

    setFavorites((prev) => {
      const exists = prev.some((p) => asId(p.id) === pid);
      if (exists) return prev.filter((p) => asId(p.id) !== pid);
      return [product, ...prev];
    });
  }

  function clearFavorites() {
    setFavorites([]);
  }

  const value = useMemo(
    () => ({
      favorites,
      favoritesCount: favorites.length,
      toggleFavorite,
      isFav,
      clearFavorites,
    }),
    [favorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
