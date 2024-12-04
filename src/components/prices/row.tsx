import { Accessor, Setter } from "solid-js";

interface RowProps {
	image: string;
	name: string;
	current_price?: number;
	price_change_percentage_24h?: number;
	index: Accessor<number>;
	setCoin: Setter<string>;
};

const Row = ({ image, name, current_price, price_change_percentage_24h, setCoin, index }: RowProps) => {
	const change = parseFloat((price_change_percentage_24h ?? 0).toFixed(2));
	const price = current_price == 0 ?
		current_price :
		(current_price ?? 0) >= 100 ?
			Math.round((current_price ?? 0)) :
			(current_price ?? 0) >= 0.1 ?
				(current_price ?? 0).toFixed(2) :
				(current_price ?? 0).toPrecision(2);

	return <div onClick={ () => setCoin(name.toLowerCase()) } style={ {
		"animation-delay": `${ index() * 50 }ms`
	} } class="flex cursor-pointer hover:bg-white/15 group opacity-0 animate-fade-in-left [animation-duration:300] flex-row py-1 transition-colors duration-200 px-2 w-full">
		<img class="rounded-full group-hover:scale-105 h-10 self-center transition-transform duration-200 opacity-90" src={ image.replace("large", "small") }/>
		<div class="flex ml-2 flex-col flex-grow">
			<h3 class="text-white/90 group-hover:scale-105 group-hover:ml-2 duratin-200 transition-all font-montserrat font-semibold text-base">{ name }</h3>
			<h3 class="font-montserrat group-hover:scale-[1.02] group-hover:ml-1 duratin-200 transition-all font-semibold text-base" style={ {
				display: current_price ? undefined : "none",
				color: change > 0 ?
					"#00BD00" :
					change < 0 ? "#CA0000" : "#999999" }}>${
					price
				}</h3>
		</div>
		<h4 class="font-mona text-base group-hover:mr-2 group-hover:scale-105 transition-all duration-200 font-semibold self-center justify-center" style={ {
			display: price_change_percentage_24h ? undefined : "none",
			color: change > 0 ?
				"#00BD00" :
				change < 0 ?
					"#CA0000" :
					"#999999"
		} }>{ change }%</h4>
	</div>;
};

export default Row;