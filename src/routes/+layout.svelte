<script>
	import Header from './Header.svelte';
	import './styles.css';
	import { onMount } from 'svelte';
	import authService from '../auth-service.js';

	import { isAuthenticated, user, user_tasks, tasks } from '../store.js';

	const authenticationGuard = (ctx, next) => {
		if ($isAuthenticated) {
			next();
		} else {
			authService.loginWithPopup({ appState: { targetUrl: ctx.pathname } });
		}
	};

	const onRedirectCallback = (appState) => {
		window.history.replaceState(
			{},
			document.title,
			appState && appState.targetUrl ? appState.targetUrl : window.location.pathname
		);
	};

	onMount(async () => {
		await authService.initializeAuth0({ onRedirectCallback });
	});
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
