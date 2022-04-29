
<h1 align="center">
  http://spotify-profile-viewer-app.vercel.app/
</h1>

<iframe src="https://giphy.com/embed/Hb1gEcdn1InGctLzZ7" width="480" height="237" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/Hb1gEcdn1InGctLzZ7">via GIPHY</a></p>

A Spotify profile viewer app built with React and Nextjs. Includes authentication handled with NextAuth and used TailwindCSS for styling purposes.

### Built with:

-   [React.js](https://reactjs.org/)
-   [Next.js](https://nextjs.org/)
-   [Axios](https://axios-http.com/docs/intro)
-   [Spotify Web Api](https://github.com/thelinmichael/spotify-web-api-node)
-   [Next-Auth.js](https://next-auth.js.org/)
-   [TailwindCSS](https://tailwindcss.com/)
-   [Framer-Motion](https://www.framer.com/motion/)

## Setup

Unfortunately I am unable to request a quota extension that allows this app to go public. However, if interested in running it locally, you would need to create a new app in the [Spotify Web API](https://developer.spotify.com/dashboard/applications) and retrieve the client id and secret.

1. Install dependencies

    ```bash
    npm install
    ```

2. Create and set environmental variables within .env in root directory

    ```bash
    NEXTAUTH_URL=http://localhost:3000
	NEXT_PUBLIC_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
	NEXT_PUBLIC_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxx
	JWT_SECRET=create-your-own-jwt-secret
    ```

3. Start development server

    ```bash
    npm run dev
    ```
