import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { LoginResponse, DecodedToken } from "@/types";
import { setAuthState } from "@/features/auth/authSlice";
import { store } from "@/store/store";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        const employee_email = email;
        const employee_password = password;

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/employee/login`,
            {
              method: "Post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ employee_email, employee_password }),
            }
          );

          const data: LoginResponse = await response.json();

          if (response.ok && data.status === "Success") {
            const decodedToken = jwtDecode<DecodedToken>(data.data.token);
            if (decodedToken) {
              return {
                employee_id: decodedToken.employee_id,
                employee_email: decodedToken.employee_email,
                employee_first_name: decodedToken.employee_first_name,
                employee_role:
                  decodedToken.employee_role === 1 ? "admin" : "employee",
                token: data.data.token,
              };
            } else {
              console.log("Faild to decode token");
              return null;
            }
          } else {
            console.log("Faild to login", data);
            return null;
          }
        } catch (error) {
          console.log("Error during authetication", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.employee_id = user.employee_id;
        token.employee_email = user.employee_email;
        token.employee_first_name = user.employee_first_name;
        token.employee_role = user.employee_role;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.employee_id = token.employee_id as number;
        session.user.employee_email = token.employee_email as string;
        session.user.employee_first_name = token.employee_first_name as string;
        session.user.employee_role = token.employee_role as string;
        session.user.token = token.token as string;
      }
      return session;
    },
  },
});
