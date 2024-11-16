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
			},
			keyframes: {
				ticker: {
					'0%': { content: '£100' },
					'20%': { content: '£80' },
					'40%': { content: '£60' },
					'60%': { content: '£40' },
					'80%': { content: '£20' },
					'100%': { content: '£0' }
				}
			},
			animation: {
				ticker: 'ticker 2s ease-out forwards'
			}
		}
	},
	plugins: []
};
export default config;
