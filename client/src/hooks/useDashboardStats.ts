import { useEffect, useState } from "react";
import { useDataProvider } from "react-admin";

export interface Stats {
  clients: number;
  categories: number;
  products: number;
  orders: number;
}

const useDashboardStats = (): {
  stats: Stats | undefined;
  loading: boolean;
  error: string | null;
} => {
  const dataProvider = useDataProvider();
  const [stats, setStats] = useState<Stats | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string| null>(null);

  useEffect(() => {
    let isMounted = true; // To prevent setting state on unmounted component

    const fetchStats = async () => {
      try {
        // Use Promise.all to fetch data in parallel
        const [clients, categories, products, orders] = await Promise.all([
          dataProvider.getList("clients", {
            pagination: { page: 1, perPage: 1 },
            sort: { field: "id", order: "ASC" },
            filter: {},
          }),
          dataProvider.getList("categories", {
            pagination: { page: 1, perPage: 1 },
            sort: { field: "id", order: "ASC" },
            filter: {},
          }),
          dataProvider.getList("products", {
            pagination: { page: 1, perPage: 1 },
            sort: { field: "id", order: "ASC" },
            filter: {},
          }),
          dataProvider.getList("orders", {
            pagination: { page: 1, perPage: 1 },
            sort: { field: "id", order: "ASC" },
            filter: {},
          }),
        ]);

        if (isMounted) {
          // Update stats with total counts
          setStats({
            clients: clients.total ?? 0,
            categories: categories.total ?? 0,
            products: products.total ?? 0,
            orders: orders.total ?? 0,
          });
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError('Что-то пошло не так');
          console.log(error)
          setLoading(false);
        }
      }
    };

    void fetchStats();

    return () => {
      isMounted = false;
    };
  }, [dataProvider]);

  return { stats, loading, error };
};

export default useDashboardStats;

