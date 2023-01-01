import { createAuth0Client } from '@auth0/auth0-spa-js';
import { user, isAuthenticated, popupOpen, auth0Client, error, isLoading } from './store';
import auth0Config from './auth0-config.js';
import { get } from 'svelte/store';

async function initializeAuth0(config = {}) {
	console.log('Initialize Auth0');

	console.log('config.domain', auth0Config.domain);
	console.log('config.clientId', auth0Config.clientId);

	auth0Client.set(
		await createAuth0Client({
			domain: auth0Config.domain,
			client_id: auth0Config.clientId,
			redirect_uri: auth0Config.redirectUri
		})
	);

	// TODO check if this is needed
	if (!config.onRedirectCallback) {
		config.onRedirectCallback = () =>
			window.history.replaceState({}, document.title, window.location.pathname);
	}

	try {
		const search = window.location.search;

		if ((search.includes('code=') || search.includes('error=')) && search.includes('state=')) {
			const { appState } = await get(auth0Client).handleRedirectCallback();

			config.onRedirectCallback(appState);
		}
	} catch (err) {
		error.set(err);
	} finally {
		isAuthenticated.set(await get(auth0Client).isAuthenticated());
		user.set((await get(auth0Client).getUser()) || null);
		isLoading.set(false);
	}

	console.log('isAuthenticated', get(isAuthenticated));
	console.log('auth0Client', get(auth0Client));
	console.log('user', get(user));
	console.log('isLoading', get(isLoading));
}

// async function createClient() {
// 	const auth0Client = await createAuth0Client({
// 		domain: config.domain,
// 		client_id: config.clientId
// 	});
//
// 	console.log('auth0Client', auth0Client);
//
// 	return auth0Client;
// }

async function loginWithPopup(options) {
	console.log('auth0Client from LOGIN', get(auth0Client));

	popupOpen.set(true);
	try {
		await get(auth0Client).loginWithPopup(options);

		user.set(await get(auth0Client).getUser());
		isAuthenticated.set(true);
	} catch (e) {
		// eslint-disable-next-line
		console.error(e);
	} finally {
		popupOpen.set(false);
	}
}

function logout(options) {
	return get(auth0Client).logout(options);
}

const authService = {
	initializeAuth0,
	loginWithPopup,
	logout
};

export default authService;
