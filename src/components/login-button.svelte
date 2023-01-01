<script>
	const login = () => {
		console.log('Logging in..');
	};
</script>

<button class="button__login" on:click={login}>Log In</button>

<style>
	.button__login {
		align-items: center;
		background: 0;
		border: 0;
		color: var(--color-text);
		display: flex;
		font-size: 0.8rem;
		font-weight: 700;
		height: 100%;
		letter-spacing: 0.1em;
		padding: 0 0.5rem;
		text-decoration: none;
		text-transform: uppercase;
		transition: color 0.2s linear;
	}

	.button__login:hover {
		cursor: pointer;
	}
</style>
