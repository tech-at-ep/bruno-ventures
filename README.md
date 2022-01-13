# 🐻 Bruno Ventures

Brown University’s entrepreneurial landscape is rich and diverse, encompassing the most innovative student minds in the world. Powered by the Nelson Center for Entrepreneurship and the Brown Entrepreneurship Program (EP), Bruno Ventures serves as a hub for learning about student entrepreneurs and startups within the Brown community.

## Getting Started

Install dependencies:

```bash
yarn install
```

Set up Firebase by creating a `.env` file based on the contents of `example.env` and adding your Firebase project
credentials.

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Using the Firebase SDK

To access the Firebase SDK, you need to use an initialized instance of the Firebase app. To do so, use `firebaseApp` (exported from `util/firebaseApp.ts`).

After importing `firebaseApp`, you can use this to access the Firebase SDK.

## Firebase Auth

To access Firebase Authentication from anywhere within the app, use the custom `useAuth()` hook. 

```javascript
const {isAuthenticated, isLoading, user} = useAuth();
```

## Deployment

The easiest way to deploy your Next.js app is to use
the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.
