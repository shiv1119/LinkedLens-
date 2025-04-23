import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const API_URL = process.env.NEXT_PUBLIC_API_URL;
          const res = await fetch(`${API_URL}/api/token/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          if (!res.ok) throw new Error("Invalid credentials");

          const tokens = await res.json();

          const userRes = await fetch(`${API_URL}/api/profile/${tokens.user_id}/`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${tokens.access}`,
            },
          });

          if (!userRes.ok) throw new Error("Failed to fetch user profile");

          const user = await userRes.json();
          const currentTime = Math.floor(Date.now() / 1000); 
          const accessTokenExpiry = currentTime + 86400; 
          const refreshTokenExpiry = currentTime + 604800;

          return {
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            profilePicture: user.profile_picture,
            bio: user.bio,
            accessToken: tokens.access,
            refreshToken: tokens.refresh,
            accessTokenExpiry,
            refreshTokenExpiry,
          };
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const currentTime = Math.floor(Date.now() / 1000);

      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpiry = user.accessTokenExpiry;
        token.refreshTokenExpiry = user.refreshTokenExpiry;
        token.user = {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          bio: user.bio,
          profilePicture: user.profilePicture,
        };
      }
      if (currentTime >= token.accessTokenExpiry && currentTime < token.refreshTokenExpiry) {
        try {
          const refreshRes = await fetch(`${API_URL}/api/token/refresh/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: token.refreshToken }),
          });

          if (!refreshRes.ok) throw new Error("Failed to refresh token");

          const newTokens = await refreshRes.json();

          token.accessToken = newTokens.access;
          token.accessTokenExpiry = currentTime + 86400;
        } catch (error) {
          console.error("Error refreshing access token:", error);
          return null; 
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
