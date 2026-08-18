import type { Category } from "./types";
import { newId, nowIso } from "./id";

interface Seed {
  name: string;
  icon: Category["icon"];
  color: Category["color"];
}

export const DEFAULT_EXPENSE_CATEGORIES: Seed[] = [
  { name: "Comida", icon: "food", color: "orange" },
  { name: "Restaurantes / Salidas", icon: "coffee", color: "pink" },
  { name: "Supermercado", icon: "cart", color: "lime" },
  { name: "Transporte", icon: "transport", color: "blue" },
  { name: "Uber / Taxi", icon: "taxi", color: "yellow" },
  { name: "Ropa", icon: "shirt", color: "mint" },
  { name: "Shopping", icon: "bag", color: "pink" },
  { name: "Belleza", icon: "sparkle", color: "pink" },
  { name: "Salud", icon: "health", color: "mint" },
  { name: "Entretenimiento", icon: "movie", color: "orange" },
  { name: "Suscripciones", icon: "repeat", color: "blue" },
  { name: "Viajes", icon: "plane", color: "yellow" },
  { name: "Regalos", icon: "gift", color: "lime" },
  { name: "Casa", icon: "home", color: "orange" },
  { name: "Educación", icon: "book", color: "blue" },
  { name: "Trabajo", icon: "briefcase", color: "mint" },
  { name: "Otros", icon: "dots", color: "cream" },
];

export const DEFAULT_INCOME_CATEGORIES: Seed[] = [
  { name: "Sueldo", icon: "briefcase", color: "lime" },
  { name: "Freelance", icon: "coin", color: "yellow" },
  { name: "Reintegro", icon: "arrow", color: "mint" },
  { name: "Regalo", icon: "gift", color: "pink" },
  { name: "Venta", icon: "cart", color: "orange" },
  { name: "Otros", icon: "star", color: "cream" },
];

export function buildDefaultCategories(): Category[] {
  const cats: Category[] = [];
  DEFAULT_EXPENSE_CATEGORIES.forEach((seed, i) => {
    cats.push({
      id: newId(),
      name: seed.name,
      icon: seed.icon,
      color: seed.color,
      order: i,
      isIncome: false,
      createdAt: nowIso(),
    });
  });
  DEFAULT_INCOME_CATEGORIES.forEach((seed, i) => {
    cats.push({
      id: newId(),
      name: seed.name,
      icon: seed.icon,
      color: seed.color,
      order: i,
      isIncome: true,
      createdAt: nowIso(),
    });
  });
  return cats;
}
