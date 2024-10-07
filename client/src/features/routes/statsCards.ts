import { Stats } from "../../hooks/useDashboardStats";

interface StatsItem {
	key: keyof Stats;
	label: string;
	backgroundColor: string;
	description: string;
}

export const statsData: StatsItem[] = [
	{
		key: "products",
		label: "Продукты",
		backgroundColor: "#FFBB28",
		description: "Общее количество доступных продуктов.",
	},
	{
		key: "clients",
		label: "Клиенты",
		backgroundColor: "#00C49F",
		description: "Общее количество зарегистрированных клиентов.",
	},
	{
		key: "categories",
		label: "Категории",
		backgroundColor: "#0088FE",
		description: "Количество доступных категорий.",
	},
	{
		key: "orders",
		label: "Заказы",
		backgroundColor: "#FF8042",
		description: "Общее количество заказов, сделанных клиентами.",
	},
];
