import { Accessor, For, Setter, Show, createResource, createSignal, onMount } from "solid-js";
import { Chart, ChartData, ChartOptions, Colors, Legend, Title, Tooltip } from "chart.js";
import { CoinGraph, Sparkline } from "../lib/crypto";

import DayJS from "dayjs";
import { Line } from "solid-chartjs";
import { simplifyNumber } from "../lib/utils";

interface GraphProps {
	coin: Accessor<string>;
	setCoin: Setter<string>;
};

const Graph = (props: GraphProps) => {

	const [ days, setDays ] = createSignal<number>(7);

	const [ data ] = createResource(props.coin, Sparkline);
	const [ sparkline ] = createResource(() => ({
		days: days(),
		coin: props.coin()
	}), ({ days, coin }) => CoinGraph(coin, days), {
		initialValue: {
			dates: [],
			prices: []
		}
	});

	onMount(() => {
		Chart.register(Title, Tooltip, Legend, Colors)
	});

	return <div onClick={ ({ target, currentTarget }) =>
		target == currentTarget ? props.setCoin("") : null
	} style={ {
		opacity: props.coin() ? 1 : 0,
		"pointer-events": props.coin() ? "auto" : "none"
	} } class="w-full h-full cursor-pointer bg-black/30 backdrop-blur-sm transition-all duration-500 top-0 left-0 overflow-hidden justify-center flex absolute">
		<div style={ {
			opacity: props.coin() ? 1 : 0,
			transform: props.coin() ? "translateY(0rem)" : "translateY(10rem)",
			scale: props.coin() ? 1 : 0.5,
			filter: props.coin() ? "blur(0)" : "blur(0.5rem)",
			"transition-delay": props.coin() ? "0.3s" : "0s"
		} } class="absolute cursor-auto self-center w-[calc(100%-2.5rem)] transition-all duration-500 flex flex-col border-2 border-white/20 rounded-lg h-[calc(100%-2.5rem)] bg-[#131313]">
			<h1 class="text-lg font-montserrat font-bold self-center mt-2 text-white/90">{ data()?.name }</h1>
			<div class="m-4">
				<Line data={ {
					labels: sparkline().dates.map(date => DayJS(date).format("MMM D ha")),//Object.keys(sparkline()).map(hour => DayJS().add(191, "hours").subtract(parseInt(hour), "hours").format("MMM D ha")),
					datasets: [
						{
							data: sparkline().prices.map(simplifyNumber),
							borderColor: sparkline().prices[0] < (sparkline().prices.at(-1) ?? 0) ?
								"#00BD0093" :
								sparkline().prices[0] > (sparkline().prices.at(-1) ?? 0) ?
									"#CA000093" :
									"#99999993",
							pointRadius: 0,
							tension: 0.7
						},
					],
				} as ChartData } options={ {
					responsive: true,
					type: "line",
					animation: {
						x: {
							type: "number",
							easing: "easeIn",
							duration: 1000 / 168,
							from: NaN,
							delay: (ctx: any) => {
								if (ctx.type != "data" || ctx.yStarted) {
									return 0;
								} else {
									ctx.yStarted = true;
									return ctx.index * 1000 / 168;
								};
							}
						},
						y: {
							type: "number",
							easing: "easeIn",
							duration: 10000 / 168,
							from: (ctx: any) =>
								ctx.index == 0 ?
									ctx.chart.scales.y.getPixelForValue(100) :
									ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(["y"], true).y,
							delay: (ctx: any) => {
								if (ctx.type != "data" || ctx.yStarted) {
									return 0;
								} else {
									ctx.yStarted = true;
									return ctx.index * 1000 / 168;
								};
							}
						}
					},
					scales: {
						x: {
							display: false
						},
						y: {
							display: false
						}
					},
					plugins: {
						legend: {
							display: false
						},
						tooltip: {
							callbacks: {
								label: ({ raw }: {
									raw: number;
								}) => `$${ raw }`
							}
						}
					},
					interaction: {
						axis: "x",
						intersect: false
					},
					aspectRatio: 1
				} as ChartOptions<any> } />
			</div>
			<div class="flex flex-row self-center mx-0.5 flex-wrap justify-center gap-y-1 gap-x-1 items-center">
				<For each={ [
					{
						display: "24 Hours",
						value: 1
					},
					{
						display: "7 Days",
						value: 7
					},
					{
						display: "14 Days",
						value: 14
					},
					{
						display: "30 Days",
						value: 30
					},
					{
						display: "60 Days",
						value: 60
					},
					{
						display: "200 Days",
						value: 200
					},
					{
						display: "1 Year",
						value: 360
					}
				] }>{
						({ display, value }) =>
							<span style={ {
								"background-color": days() == value ? "#FFFFFF30" : undefined
							} } onClick={ () => setDays(value) } class="px-2 py-1 cursor-pointer hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200 rounded-md text-white border-white/30 border font-mona text-xs font-medium">
								{ display }
							</span>
					}
				</For>
			</div>
			<div class="flex self-center flex-grow items-center flex-row">
				<For each={ [
					{
						link: data()?.links?.homepage[0],
						name: "Home"
					},
					{
						link: data()?.links?.subreddit_url,
						name: "Subreddit"
					},
					{
						link: data()?.links?.repos_url.github[0],
						name: "Github"
					}
				] }>
					{
						({ link, name }) =>
							<Show when={ link }>
								<div class="group">
									<a style={ {
										display: link ? undefined : "none"
									} } class="text-white text-sm transition-all duration-300 border-white font-mona" href={ link ?? "" }>{ name }</a>
									<hr class="bg-white opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm group-hover:blur-0 group-hover:translate-y-0 translate-y-1.5" />
								</div>
								<span class="text-white/50 text-sm mx-2 last:hidden">•</span>
							</Show>
					}
				</For>
			</div>
		</div>
	</div>;
};

export default Graph;