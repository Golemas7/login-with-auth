<script>
	import { page } from '$app/stores';

	import auth, { getIsAuthenticated } from 'sveltekit-auth0';
	import { onDestroy, onMount } from 'svelte';

	const testLink = import.meta.env['PUBLIC_VITE_AUTH0_DOMAIN'];

	let isAuthenticated = false;
	let subscription;

	async function login() {
		await auth.loginWithPopup();
	}

	function logout() {
		auth.logout();
	}

	onMount(() => {
		const isAuthenticated$ = getIsAuthenticated();

		subscription = isAuthenticated$.subscribe((value) => {
			isAuthenticated = value;
		});

		console.log('testLink', testLink);
	});

	onDestroy(() => {
		subscription?.unsubscribe();
	});
</script>

<nav>
	<svg viewBox="0 0 2 3" aria-hidden="true">
		<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
	</svg>
	<ul>
		<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
			<a href="/">Home</a>
		</li>
		{#if !isAuthenticated}
			<li>
				<a class="btn btn-primary btn-lg mr-auto ml-auto" href="/" role="button" on:click={login}
					>Log In</a
				>
			</li>
		{:else}
			<li>
				<a class="btn btn-primary btn-lg mr-auto ml-auto" href="/" role="button" on:click={logout}
					>Log Out</a
				>
			</li>
		{/if}
	</ul>
	<svg viewBox="0 0 2 3" aria-hidden="true">
		<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
	</svg>
</nav>

<style>
	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a,
	nav .login-button {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}
</style>
