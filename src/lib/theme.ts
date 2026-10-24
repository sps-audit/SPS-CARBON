/*
 * Light and dark versions of the site.
 * The light version is the default for every new visitor. A choice made with
 * the switch is stored under THEME_KEY and wins from then on. THEME_BOOT runs
 * in <head> before the first paint so the page never flashes the wrong version.
 */
export type Theme = "light" | "dark";

export const THEME_KEY = "sps-theme";

export const DEFAULT_THEME: Theme = "light";

// Browser bar colour for each version (matches the page background).
export const THEME_COLORS: Record<Theme, string> = { light: "#F2F7F5", dark: "#04151A" };

export const THEME_BOOT = `(function(){var d=document.documentElement;d.classList.add('js');var t=null;try{t=localStorage.getItem('${THEME_KEY}')}catch(e){}if(t!=='light'&&t!=='dark'){t='light'}d.setAttribute('data-theme',t)})();`;
