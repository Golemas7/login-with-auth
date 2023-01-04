<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';

	import auth, { getIsAuthenticated } from 'sveltekit-auth0';
	import { onMount } from 'svelte';

	let isAuthenticated = false;

	function login() {
		auth.loginWithPopup();
	}

	onMount(() => {
		const isAuthenticated$ = getIsAuthenticated();

		isAuthenticated$.subscribe((value) => {
			isAuthenticated = value;
		});
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	{#if !isAuthenticated}
		<span
			>To use this app you need to <a
				class="btn btn-primary btn-lg mr-auto ml-auto"
				href="/"
				role="button"
				on:click={login}>Log In</a
			></span
		>
	{:else}
		<h1>
			<span class="welcome">
				<picture>
					<source srcset={welcome} type="image/webp" />
					<img src={welcome_fallback} alt="Welcome" />
				</picture>
			</span>

			to your new<br />SvelteKit app
		</h1>

		<h2>
			try editing <strong>src/routes/+page.svelte</strong>
		</h2>

		<Counter />
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
