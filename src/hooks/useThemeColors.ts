"use client";
import { useEffect, useState } from "react";

export interface ThemeColors {
	primary: string;
	primaryContent: string;
	secondary: string;
	secondaryContent: string;
	accent: string;
	accentContent: string;
	neutral: string;
	neutralContent: string;
	base100: string;
	base200: string;
	base300: string;
	baseContent: string;
	info: string;
	infoContent: string;
	success: string;
	successContent: string;
	warning: string;
	warningContent: string;
	error: string;
	errorContent: string;
}

export default function useThemeColors() {
	const [themeColors, setThemeColors] = useState<ThemeColors | null>(null);

	useEffect(() => setThemeColors(extractThemeColorsFromDOM()), []);

	function extractThemeColorsFromDOM(): ThemeColors {
		const computedStyles = window.getComputedStyle(document.querySelector(":root")!);
		return {
			primary: `OKLCH(${computedStyles.getPropertyValue("--p")})`,
			primaryContent: `OKLCH(${computedStyles.getPropertyValue("--pc")})`,
			secondary: `OKLCH(${computedStyles.getPropertyValue("--s")})`,
			secondaryContent: `OKLCH(${computedStyles.getPropertyValue("--sc")})`,
			accent: `OKLCH(${computedStyles.getPropertyValue("--a")})`,
			accentContent: `OKLCH(${computedStyles.getPropertyValue("--ac")})`,
			neutral: `OKLCH(${computedStyles.getPropertyValue("--n")})`,
			neutralContent: `OKLCH(${computedStyles.getPropertyValue("--nc")})`,
			base100: `OKLCH(${computedStyles.getPropertyValue("--b1")})`,
			base200: `OKLCH(${computedStyles.getPropertyValue("--b2")})`,
			base300: `OKLCH(${computedStyles.getPropertyValue("--b3")})`,
			baseContent: `OKLCH(${computedStyles.getPropertyValue("--bc")})`,
			info: `OKLCH(${computedStyles.getPropertyValue("--in")})`,
			infoContent: `OKLCH(${computedStyles.getPropertyValue("--inc")})`,
			success: `OKLCH(${computedStyles.getPropertyValue("--su")})`,
			successContent: `OKLCH(${computedStyles.getPropertyValue("--suc")})`,
			warning: `OKLCH(${computedStyles.getPropertyValue("--wa")})`,
			warningContent: `OKLCH(${computedStyles.getPropertyValue("--wac")})`,
			error: `OKLCH(${computedStyles.getPropertyValue("--er")})`,
			errorContent: `OKLCH(${computedStyles.getPropertyValue("--erc")})`,
		};
	}

	return themeColors;
}
