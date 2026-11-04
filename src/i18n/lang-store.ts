import { readable } from "svelte/store";

export const langTick = readable(0, (set) => {
	let n = 0;
	const bump = () => set(++n);
	window.addEventListener("site-lang-change", bump);
	return () => window.removeEventListener("site-lang-change", bump);
});