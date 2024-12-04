export interface Price {
	image: string;
	name: string;
	current_price: number;
	price_change_percentage_24h: number;
};

export interface Coin {
	name: string;
	links: {
		homepage: string[];
		blockchain_site: string[];
		official_forum_url: string[];
		chat_url: string[];
		announcement_url: string[];
		twitter_screen_name: string | null;
		facebook_username: string | null;
		bitcointalk_thread_identifier: number | null;
		telegram_channel_identifier: string | null;
		subreddit_url: string | null;
		repos_url: { github: string[], bitbucket: string[] };
		whitepaper: string | null
	};
	market_data: {
		current_price: Record<string, number>;
		ath: Record<string, number>;
		ath_change_percentage: Record<string, number>;
		ath_date: Record<string, string>;
		atl: Record<string, number>;
		atl_change_percentage: Record<string, number>;
		atl_date: Record<string, string>;
		market_cap: Record<string, number>;
		market_cap_rank: number;
		fully_diluted_valuation: Record<string, number> | null;
		total_volume: Record<string, number>;
		high_24h: Record<string, number>;
		low_24h: Record<string, number>;
		price_change_24h: number | null;
		price_change_percentage_24h: number | null;
		price_change_percentage_7d: number | null;
		price_change_percentage_14d: number | null;
		price_change_percentage_30d: number | null;
		price_change_percentage_60d: number | null;
		price_change_percentage_200d: number | null;
		price_change_percentage_1y: number | null;
		market_cap_change_24h: number | null;
		market_cap_change_percentage_24h: number | null;
		price_change_24h_in_currency: Record<string, number | null>;
		price_change_percentage_1h_in_currency: Record<string, number | null>;
		price_change_percentage_24h_in_currency: Record<string, number | null>;
		price_change_percentage_7d_in_currency: Record<string, number | null>;
		price_change_percentage_14d_in_currency: Record<string, number | null>;
		price_change_percentage_30d_in_currency: Record<string, number | null>;
		price_change_percentage_60d_in_currency: Record<string, number | null>;
		price_change_percentage_200d_in_currency: Record<string, number | null>;
		price_change_percentage_1y_in_currency: Record<string, number | null>;
		market_cap_change_24h_in_currency: Record<string, number | null>;
		market_cap_change_percentage_24h_in_currency: Record<string, number | null>;
		total_supply: number | null;
		max_supply: number | null;
		max_supply_infinite: boolean,
		circulating_supply: number | null;
		sparkline_7d: {
			price: number[]
		} | null;
		last_updated: string;
	};
	image: {
		thumb: string;
		small: string;
		large: string;
	};
};

export interface Graph {
	prices: [
		number,
		number
	][];
	market_caps: [
		number,
		number
	][];
	total_volumes: [
		number,
		number
	][];
};