export interface ImageValidity {
	valid: boolean;
}

export interface AvenueUser {
	id: string;
	name: string;
	profile_image: string | null;
}

export interface Avenue {
	id: string;
	created_at: string;
	updated_at: string;
	name: string;
	description: string;
	profile_image: string;
	user_id: string;
}

export interface Statistics {
	id: string;
	created_at: string;
	updated_at: string;
	geographic_location: string;
	traffic_source: string;
	click_timestamp: Date;
	avenue_id: string;
}

export interface Links {
	id: string;
	created_at: string;
	updated_at: string;
	url: string;
	description: string;
	avenue_id: string;
}

export interface Link {
	id: string;
	url: string;
	name: string;
}

export interface ClickData {
	click_date: Date;
	total_clicks: number;
}

export interface DashboardInfo {
	avenueID: string;
	aggregateClicks: number;
	linksRes: number;
	chartData: ClickData[];
}

export type Colour =
	| 'bg-slate-500'
	| 'bg-red-500'
	| 'bg-orange-500'
	| 'bg-amber-500'
	| 'bg-yellow-500'
	| 'bg-lime-500'
	| 'bg-green-500'
	| 'bg-emerald-500'
	| 'bg-teal-500'
	| 'bg-cyan-500'
	| 'bg-sky-500'
	| 'bg-blue-500'
	| 'bg-indigo-500'
	| 'bg-violet-500'
	| 'bg-purple-500'
	| 'bg-fuchsia-500'
	| 'bg-pink-500'
	| 'bg-rose-500';

export const colours: Colour[] = [
	'bg-slate-500',
	'bg-orange-500',
	'bg-amber-500',
	'bg-yellow-500',
	'bg-lime-500',
	'bg-green-500',
	'bg-emerald-500',
	'bg-teal-500',
	'bg-cyan-500',
	'bg-sky-500',
	'bg-blue-500',
	'bg-indigo-500',
	'bg-violet-500',
	'bg-purple-500',
	'bg-fuchsia-500',
	'bg-pink-500',
	'bg-rose-500'
];
