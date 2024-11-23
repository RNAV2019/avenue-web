import { ClickData } from '@/lib/helper';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	ChartData,
	ChartOptions,
	Tooltip
} from 'chart.js';

export default function ClicksChart({
	chartData,
	windowWidth
}: {
	chartData: ClickData[];
	windowWidth: number;
}) {
	ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip); // Register Tooltip plugin
	// Function to format dates based on screen size
	const formatDate = (date: Date) => {
		// lg screens typically start at 1024px
		if (windowWidth >= 1024) {
			// Long form date: "January 1, 2024"
			return date.toLocaleDateString(undefined, {
				month: 'short',
				day: 'numeric',
				year: '2-digit'
			});
		} else {
			// Short form date: "1/1/24" or "01/01"
			return date.toLocaleDateString(undefined, {
				month: 'numeric',
				day: 'numeric'
			});
		}
	};

	const labels = chartData.map((data) => formatDate(new Date(data.click_date)));

	const values = chartData.map((data) => data.total_clicks);
	const lineData: ChartData<'line'> = {
		labels,
		datasets: [
			{
				label: 'Clicks by Date',
				data: values,
				borderColor: 'white',
				tension: 0.1,
				pointBackgroundColor: 'white',
				pointBorderColor: 'white',
				pointRadius: 4
			}
		]
	};
	const options: ChartOptions<'line'> = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				ticks: {
					color: 'white',
					maxRotation: 45,
					autoSkip: true,
					font: {
						size: windowWidth >= 1024 ? 12 : 10
					}
				}
			},
			y: {
				ticks: {
					color: 'white'
				}
			}
		},
		plugins: {
			legend: {
				labels: {
					color: 'white'
				}
			},
			tooltip: {
				enabled: true,
				backgroundColor: 'rgba(0,0,0,0.8)',
				titleColor: 'white',
				bodyColor: 'white',
				displayColors: false,
				callbacks: {
					// Optional: Show full date in tooltip regardless of screen size
					title: (context) => {
						const date = new Date(chartData[context[0].dataIndex].click_date);
						return date.toLocaleDateString(undefined, {
							month: 'long',
							day: 'numeric',
							year: 'numeric'
						});
					}
				}
			}
		}
	};
	return (
		<div className="h-full w-full">
			<Line data={lineData} options={options} />
		</div>
	);
}
