<div align="center">
  <img alt="Halcyon" src="https://app-artworks.sfo3.digitaloceanspaces.com/spotify.svg" width="100" />
</div>
<h1 align="center">
  Spotify Profile Viewer App
</h1>

A [Spotify Profile Viewer App](http://spotify-profile-viewer-app.vercel.app/) built with React and Nextjs. Includes authentication handled with NextAuth and used TailwindCSS for styling purposes.

![](https://i.imgur.com/cj9Hyi1.png)
![](https://i.imgur.com/6fjN3vu.png)
![](https://i.imgur.com/9GoVYYA.png)

### Built with:

-   [React.js](https://reactjs.org/)
-   [Next.js](https://nextjs.org/)
-   [Axios](https://axios-http.com/docs/intro)
-   [Spotify Web Api](https://github.com/thelinmichael/spotify-web-api-node)
-   [Next-Auth.js](https://next-auth.js.org/)
-   [TailwindCSS](https://tailwindcss.com/)
-   [Framer-Motion](https://www.framer.com/motion/)

## Setup

Unfortunately, I am unable to request a quota extension that allows this app to go public. However, if interested in running it locally, you would need to create a new app in the [Spotify Web API](https://developer.spotify.com/dashboard/applications) and retrieve the client id and secret.

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

3. Within the settings of the [Spotify App](https://developer.spotify.com/dashboard/) you recently created in your dashboard add the following under the redurect URI's section

    ```bash
    http://localhost:3000/api/auth/callback/spotify
    ```

4. Start development server

    ```bash
    npm run dev
    ```
