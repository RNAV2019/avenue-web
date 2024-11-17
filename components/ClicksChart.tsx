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

export default function ClicksChart({ chartData }: { chartData: ClickData[] }) {
	ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip); // Register Tooltip plugin
	const labels = chartData.map((data) => new Date(data.click_date).toLocaleDateString());
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
					color: 'white'
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
				displayColors: false
			}
		}
	};
	return (
		<div className="h-full w-full">
			<Line data={lineData} options={options} />
		</div>
	);
}
