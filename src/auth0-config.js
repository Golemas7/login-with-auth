import { PUBLIC_AUTH_CLIENT_ID, PUBLIC_AUTH_DOMAIN, PUBLIC_REDIRECT_URI } from '$env/static/public';

const auth0Config = {
	domain: PUBLIC_AUTH_DOMAIN,
	clientId: PUBLIC_AUTH_CLIENT_ID,
	redirectUri: PUBLIC_REDIRECT_URI
};

export default auth0Config;
