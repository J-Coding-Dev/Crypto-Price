import "./styles/global.css";

import { createSignal, type Component } from "solid-js";
import Prices from "./components/prices/prices";
import Search from "./components/search";
import { render } from "solid-js/web";
import Chart from "./components/graph";

const App: Component = () => {
	const [ query, setQuery ] = createSignal("");
	const [ coin, setCoin ] = createSignal("");

	return <div class="relative bg-black w-full flex flex-col h-full">
		<Search query={ query } setQuery={ setQuery } />
		<div style={ {
			overflow: coin() ? "hidden" : "scroll"
		} } class="w-full flex flex-col [scrollbar-width:none] [&::-webkit-scrollbar]:hidden overflow-scroll flex-1">
			<Prices setCoin={ setCoin } query={ query } />
		</div>
		<Chart coin={ coin } setCoin={ setCoin } />
	</div>;
};

render(() => <App />, document.querySelector("body")!);
