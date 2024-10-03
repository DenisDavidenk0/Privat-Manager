import { Card, CardContent, Typography, Grid } from "@mui/material";
import { useDataProvider } from "react-admin";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard: React.FC = () => {
	const dataProvider = useDataProvider();
	const [stats, setStats] = useState({
		clients: 0,
		categories: 0,
		products: 0,
		orders: 0,
	});

	const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

	const pieData = [
		{ name: "Клиенты", value: stats.clients },
		{ name: "Категории", value: stats.categories },
		{ name: "Продукты", value: stats.products },
		{ name: "Заказы", value: stats.orders },
	];

	useEffect(() => {
		Promise.all([
			dataProvider.getList("clients", {
				pagination: { page: 1, perPage: 10 },
				sort: { field: "id", order: "ASC" },
				filter: {},
			}),
			dataProvider.getList("categories", {
				pagination: { page: 1, perPage: 10 },
				sort: { field: "id", order: "ASC" },
				filter: {},
			}),
			dataProvider.getList("products", {
				pagination: { page: 1, perPage: 10 },
				sort: { field: "id", order: "ASC" },
				filter: {},
			}),
			dataProvider.getList("orders", {
				pagination: { page: 1, perPage: 10 },
				sort: { field: "id", order: "ASC" },
				filter: {},
			}),
		]).then(([clients, categories, products, orders]) => {
			setStats({
				clients: clients.total ?? 0,
				categories: categories.total ?? 0,
				products: products.total ?? 0,
				orders: orders.total ?? 0,
			});
		});
	}, [dataProvider]);

	// Добавляем стиль для одинакового размера карточек
	const cardStyle = {
		backgroundColor: "#0088FE",
		height: "150px", // Фиксированная высота для всех карточек
		display: "flex",
		flexDirection: "column" as "column",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	};

	return (
		<Grid container spacing={2} padding={2}>
			{/* Левый блок с круговой диаграммой */}
			<Grid item xs={12} md={6}>
				<Card>
					<CardContent>
						<Typography variant="h6" gutterBottom>
							Сводная статистика
						</Typography>
						<ResponsiveContainer width="100%" height={300}>
							<PieChart>
								<Pie
									data={pieData}
									dataKey="value"
									nameKey="name"
									cx="50%"
									cy="50%"
									outerRadius={100}
									fill="#8884d8"
									label
								>
									{pieData.map((_entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</Grid>

			{/* Правый блок с карточками */}
			<Grid item xs={12} md={6}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<Card sx={{ ...cardStyle, backgroundColor: "#FFBB28" }}>
							<CardContent>
								<Typography variant="h6" color="white">
									Продукты
								</Typography>
								<Typography variant="h4" color="white">
									{stats.products}
								</Typography>
								<Typography variant="body2" color="white">
									Общее количество доступных продуктов.
								</Typography>
							</CardContent>
						</Card>
					</Grid>

					<Grid item xs={12} sm={6}>
						<Card sx={{ ...cardStyle, backgroundColor: "#00C49F" }}>
							<CardContent>
								<Typography variant="h6" color="white">
									Клиенты
								</Typography>
								<Typography variant="h4" color="white">
									{stats.clients}
								</Typography>
								<Typography variant="body2" color="white">
									Общее количество зарегистрированных клиентов.
								</Typography>
							</CardContent>
						</Card>
					</Grid>

					<Grid item xs={12} sm={6}>
						<Card sx={{ ...cardStyle, backgroundColor: "#0088FE" }}>
							<CardContent>
								<Typography variant="h6" color="white">
									Категории
								</Typography>
								<Typography variant="h4" color="white">
									{stats.categories}
								</Typography>
								<Typography variant="body2" color="white">
									Количество доступных категорий.
								</Typography>
							</CardContent>
						</Card>
					</Grid>

					<Grid item xs={12} sm={6}>
						<Card sx={{ ...cardStyle, backgroundColor: "#FF8042" }}>
							<CardContent>
								<Typography variant="h6" color="white">
									Заказы
								</Typography>
								<Typography variant="h4" color="white">
									{stats.orders}
								</Typography>
								<Typography variant="body2" color="white">
									Общее количество заказов, сделанных клиентами.
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Dashboard;
