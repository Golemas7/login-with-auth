import { sveltekit } from '@sveltejs/kit/vite';
// import { loadEnv } from 'vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default ({ mode }) => {
	// process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return {
		...config
	};
};
