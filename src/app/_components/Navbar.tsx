"use client";
import React from "react";
import { type UseTRPCQueryResult } from "@trpc/react-query/shared";
import { type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "@/server/api/root";
import { type TRPCClientErrorLike } from "@trpc/react-query";
import Link from "next/link";
import { signOut } from "next-auth/react";

type TUser = NonNullable<
  UseTRPCQueryResult<
    inferRouterOutputs<AppRouter>["user"]["myProfile"],
    TRPCClientErrorLike<AppRouter>
  >["data"]
>;

type TNavbar = {
  user: TUser;
  isLoading: boolean;
};

const Navbar = ({ user, isLoading }: TNavbar) => {
  const { email, name } = user;
  return (
    <nav className="split-nav fixed border">
      <div className="nav-brand">
        <h3>
          <a href="#">Expense management</a>
        </h3>
      </div>
      <div className="collapsible">
        <input id="collapsible1" type="checkbox" name="collapsible1" />
        <label htmlFor="collapsible1">
          <div className="bar1" />
          <div className="bar2" />
          <div className="bar3" />
        </label>
        <div className="collapsible-body">
          <ul className="inline">
            {/* <li className="inline-block px-4">
              <Link href="#">Home</Link>
            </li> */}
            <li></li>
            <li>
              <button onClick={() => signOut()}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
