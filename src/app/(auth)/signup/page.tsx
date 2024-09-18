import React from "react";
import SignupForm from "./SignupForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SignupPage = async () => {
  const session = await getServerSession();
  if (session) redirect("/");

  return (
    <div>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
