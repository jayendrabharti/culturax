import { Profile } from "@prisma/client";
import { Session } from "next-auth";

export interface SessionWithProfile extends Session {
  user: Session["user"] & {
    profile: Profile;
  };
}
