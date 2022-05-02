<div align="center">
  <img alt="Halcyon" src="https://app-artworks.sfo3.digitaloceanspaces.com/spotify.svg" width="100" />
</div>
<h1 align="center">
  Spotify Profile Viewer App
</h1>

A [Spotify Profile Viewer App](http://spotify-profile-viewer-app.vercel.app/) built with React and Nextjs. Includes authentication handled with NextAuth and used TailwindCSS for styling purposes. This app consumes the [Spotify Web Api](https://developer.spotify.com/documentation/web-api/) in order to retrieve the user's profile details, as well as specific details of the user's hearted songs and playlists. Thanks to [thelinmicheal](https://github.com/thelinmichael/spotify-web-api-node), can easily consume the Spotify Web Api via pre-defined functions that automatically pass in the authorization tokens, required for access, along with specific requests to the Spotify Web Api.

![](https://i.imgur.com/cj9Hyi1.png)
![](https://i.imgur.com/6fjN3vu.png)
![](https://i.imgur.com/9GoVYYA.png)
![](https://i.imgur.com/l1GP4wJ.png)

### Built with:

-   [React.js](https://reactjs.org/)
-   [Next.js](https://nextjs.org/)
-   [Axios](https://axios-http.com/docs/intro)
-   [Spotify Web Api](https://github.com/thelinmichael/spotify-web-api-node)
-   [Next-Auth.js](https://next-auth.js.org/)
-   [TailwindCSS](https://tailwindcss.com/)
-   [Framer-Motion](https://www.framer.com/motion/)

## Setup

Unfortunately, I am unable to request a quota extension that allows this app to be used publically. It _can_ be used, but it requires me manually adding your email associated with your Spotify account to the Spotify app. However, if interested in running it locally, you would need to create a new app in the [Spotify Web API](https://developer.spotify.com/dashboard/applications) and retrieve the client id and secret.

1. Install dependencies

    ```bash
    npm install
    ```

2. Create and set environmental variables within .env in root directory

    ```bash
    NEXTAUTH_URL=http://localhost:3000
    NEXT_PUBLIC_CLIENT_SECRET=spotify-app-client-secret
    NEXT_PUBLIC_CLIENT_ID=spotify-app-client-id
    JWT_SECRET=create-your-own-jwt-secret
    ```

3. Within the settings of the [Spotify App](https://developer.spotify.com/dashboard/) you recently created in your dashboard, add the following under the redirect URI's section (for [next-auth](https://next-auth.js.org/providers/spotify))

    ```bash
    http://localhost:3000/api/auth/callback/spotify
    ```

4. Start development server

    ```bash
    npm run dev
    ```
