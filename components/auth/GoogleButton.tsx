"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

export default function GoogleButton() {
  return (
    <Button
      variant={"outline"}
      type={"button"}
      className={""}
      onClick={() => signIn("google")}
    >
      Log in
      <FcGoogle />
    </Button>
  );
}
