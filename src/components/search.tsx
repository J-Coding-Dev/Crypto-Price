import { Accessor, Setter } from "solid-js";
import { FiSearch, FiX } from "solid-icons/fi";

import { Dynamic } from "solid-js/web";

interface SearchProps {
	setQuery: Setter<string>;
	query: Accessor<string>;
};

const Search = (props: SearchProps) => {

	let inputRef: HTMLInputElement;

	const submit = () => {
		props.setQuery(inputRef.value);
	};

	return <div class="opacity-90 border border-white/30 my-2 self-center items-center w-5/6 rounded-md flex flex-row">
		<input onKeyPress={ ({ key }) => key == "Enter" ? submit() : null } ref={ inputRef! } class="border-0 bg-transparent flex-1 pl-2 mr-2 font-mona text-sm text-white/80 py-1 outline-none placeholder:text-white/70" placeholder="Search..." />
		<Dynamic onClick={ () => props.query() ? [ inputRef.value = "", props.setQuery("") ] : submit() } component={ props.query() ? FiX : FiSearch } class="pr-2 w-6 h-6 hover:scale-110 cursor-pointer transition-transform duration-300 py-1 text-white/70" stroke-width={ 2.5 } color="white" />
	</div>
};

export default Search;