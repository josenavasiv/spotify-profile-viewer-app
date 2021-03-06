import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
	'user-read-email',
	'playlist-read-private',
	'playlist-read-collaborative',
	'user-read-private',
	'user-library-read',
	'user-top-read',
	'user-read-currently-playing',
	'user-read-recently-played',
	'user-follow-read',
].join(',');

// Spotify Login URL w/ all the scopes passed into it as query params
const params = { scope: scopes };
const queryParamString = new URLSearchParams(params);
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

// Single Instantiation of the spotifyAPI that we reference in client
const spotifyAPI = new SpotifyWebApi({
	clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
	clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyAPI;

export { LOGIN_URL };
