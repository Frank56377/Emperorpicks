import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide email and password")
        }

        // Test Account
        if (credentials.email === "test@betgenie.com" && credentials.password === "test123") {
          return {
            id: "test-user-001",
            name: "Test User",
            email: "test@betgenie.com",
            image: "https://i.pravatar.cc/150?u=testuser",
          }
        }

        throw new Error("Invalid credentials")
      }
    })
  ],

  pages: {
    signIn: '/auth/login',
    error: '/auth/login',        // Show errors on login page
  },

  debug: true,                   // ← Enable debug mode
})

export { handler as GET, handler as POST }