/*
 * Light and dark versions of the site.
 * The visitor's choice is stored under THEME_KEY; without a choice the site
 * follows the device setting. THEME_BOOT runs in <head> before the first paint
 * so the page never flashes the wrong version.
 */
export type Theme = "light" | "dark";

export const THEME_KEY = "sps-theme";

// Browser bar colour for each version (matches the page background).
export const THEME_COLORS: Record<Theme, string> = { light: "#F2F7F5", dark: "#04151A" };

export const THEME_BOOT = `(function(){var d=document.documentElement;d.classList.add('js');var t=null;try{t=localStorage.getItem('${THEME_KEY}')}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}d.setAttribute('data-theme',t)})();`;
