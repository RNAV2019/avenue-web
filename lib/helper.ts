export interface ImageValidity {
	valid: boolean;
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
