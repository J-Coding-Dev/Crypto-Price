import { Accessor, For, Setter, createResource } from "solid-js";
import { GetPrices, Search } from "../../lib/crypto";

import Row from "./row";

interface PricesProps {
	query: Accessor<string>;
	setCoin: Setter<string>;
};

const Prices = (props: PricesProps) => {

	const [ data ] = createResource(GetPrices);
	const [ search ] = createResource(props.query, Search);

	return <div class="flex flex-col">
		<For each={ search() || data() }>
			{ (priceData, index) =>
				<Row setCoin={ props.setCoin } index={ index } { ...priceData } />
			}
		</For>
	</div>;
};

export default Prices;