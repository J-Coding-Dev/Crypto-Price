import { Coin, Graph, Price } from "../types/crypto";

import Axios from "axios";

export const GetPrices = async (): Promise<Price[]> => {
	try {
		const { data } = await Axios("https://api.coingecko.com/api/v3/coins/markets", {
			params: {
				"vs_currency": "usd",
				"order": "market_cap_desc",
				"per_page": 20,
				"page": 1
			}
		});

		return data;
	} catch {
		return [];
	};
};

export const Search = async (query: string): Promise<Omit<Omit<Price, "current_price">, "price_change_percentage_24h">[] | undefined> => {
	try {
		if (query == "") {
			return;
		};

		const { data } = await Axios("https://api.coingecko.com/api/v3/search", {
			params: {
				query: query
			}
		});

		return data.coins.map((coin: any) => ({
			...coin,
			image: coin.large
		}));
	} catch {
		return [];
	};
};

export const Sparkline = async (coin: string) => {
	try {
		if (coin == "") {
			return {};
		}

		const { data } = await Axios<Coin>("https://api.coingecko.com/api/v3/coins/" + coin, {
			params: {
				"localization": false,
				"tickers": false,
				"market_data": false,
				"community_data": false,
				"developer_data": false,
				"sparkline": false
			}
		});

		const { name, links, image } = data;

		return {
			name,
			links,
			image
		};
	} catch {
		return {};
	};
};

export const CoinGraph = async (coin: string, days: number | "max") => {
	try {
		if (coin == "") {
			return {
				dates: [],
				prices: []
			};
		}

		const { data } = await Axios<Graph>(`https://api.coingecko.com/api/v3/coins/${ coin }/market_chart/`, {
			params: {
				"vs_currency": "usd",
				"days": days
			}
		});

		return data.prices.reduce(({ dates, prices }, [ date, price ]) => ({
			dates: [ ...dates, date ],
			prices: [ ...prices, price ]
		}), {
			dates: [] as number[],
			prices: [] as number[]
		});
	} catch {
		return {
			dates: [],
			prices: []
		};
	};
};