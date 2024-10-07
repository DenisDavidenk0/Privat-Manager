import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

interface StatsCardProps {
	title: string;
	value: number;
	description: string;
	backgroundColor: string;
}

const StatsCard: React.FC<StatsCardProps> = React.memo(
	({ title, value, description, backgroundColor }) => {
		const cardStyle = {
			backgroundColor,
			height: "150px",
			display: "flex",
			flexDirection: "column" as "column",
			justifyContent: "center",
			alignItems: "center",
			textAlign: "center",
		};

		return (
			<Card sx={cardStyle}>
				<CardContent>
					<Typography variant="h6" color="white">
						{title}
					</Typography>
					<Typography variant="h4" color="white">
						{value}
					</Typography>
					<Typography variant="body2" color="white">
						{description}
					</Typography>
				</CardContent>
			</Card>
		);
	}
);

export default StatsCard;
