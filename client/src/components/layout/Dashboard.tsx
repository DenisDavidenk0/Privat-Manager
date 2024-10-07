import { Grid, Card, CardContent, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { statsData } from "../../features/routes/statsCards";
import StatsCard from "../../features/statsCard/StatsCard";
import useDashboardStats from "../../hooks/useDashboardStats";

const Dashboard: React.FC = () => {
	// Получаем статистические данные с помощью пользовательского хука
	const { stats } = useDashboardStats();

	const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

	const pieData = [
		{ name: "Клиенты", value: stats?.clients },
		{ name: "Категории", value: stats?.categories },
		{ name: "Продукты", value: stats?.products },
		{ name: "Заказы", value: stats?.orders },
	];

	return (
		<Grid container padding={2} spacing={2}>
			<Grid item md={6} xs={12}>
				<Card>
					<CardContent>
						<Typography gutterBottom variant="h6">
							Сводная статистика
						</Typography>
						<ResponsiveContainer height={300} width="100%">
							<PieChart>
								<Pie
									label
									cx="50%"
									cy="50%"
									data={pieData}
									dataKey="value"
									fill="#8884d8"
									nameKey="name"
									outerRadius={100}
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

			<Grid container item md={6} spacing={2} xs={12}>
				{statsData?.map(({ key, label, backgroundColor, description }) => (
					<Grid key={key} item sm={6} xs={12}>
						{stats != null ? (
							<StatsCard
								backgroundColor={backgroundColor}
								description={description}
								title={label}
								value={stats[key]}
							/>
						) : null}
					</Grid>
				))}
			</Grid>
		</Grid>
	);
};

export default Dashboard;
