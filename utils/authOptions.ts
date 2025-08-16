import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import prisma from "@/prisma/client";
import { SessionWithProfile } from "@/types/auth";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ profile }: any) {
      const userExists = await prisma.profile.findUnique({
        where: {
          email: profile?.email as string,
        },
      });

      if (!userExists) {
        await prisma.profile.create({
          data: {
            email: profile?.email as string,
            name: profile?.name as string,
            image: profile?.picture as string,
          },
        });
      }

      return true;
    },
    async session({ session }: any): Promise<SessionWithProfile> {
      const profile = await prisma.profile.findUnique({
        where: {
          email: session?.user?.email as string,
        },
      });

      if (profile) {
        if (session && session.user) {
          session.user.profile = profile;
        }
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
