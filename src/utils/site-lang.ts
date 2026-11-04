import { getTranslation } from "../i18n/translation";

const STORAGE_KEY = "site-lang";

export const getSavedLang = (): string | null => {
	try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
};

export function applyLang(lang: string, save = true) {
	const dict = getTranslation(lang) as Record<string, string>;
	document.documentElement.lang = lang;
	document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
		const text = dict[el.dataset.i18n!];
		if (text) el.textContent = text;
	});
	if (save) {
		try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
	}
	// Lets client-only Svelte components know they should re-render
	window.dispatchEvent(new CustomEvent("site-lang-change", { detail: lang }));
}