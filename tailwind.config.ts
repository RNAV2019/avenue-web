import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			boxShadow: {
				brutal: '3px 4px 0px 1px #000;',
				calm: '1.5px 2px 0px 1px #000;'
			},
			fontFamily: {
				rubik: ['var(--font-rubik)'],
				outfit: ['var(--font-outfit)']
			}
		}
	},
	plugins: []
};
export default config;
