"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type TLogin = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<TLogin>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<TLogin> = async (data) => {
    try {
      const res = await signIn("credentials", { ...data, redirect: false });
      console.log(res?.error);
      if (res?.ok) {
        router.replace("/");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="-mt-5 flex min-h-screen items-center justify-center">
      <div className="card mx-auto  max-w-[400px] rounded-lg px-5 py-4">
        <h2>Welcome Back</h2>
        <h4>Login</h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 flex flex-col gap-2"
        >
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            placeholder="email"
            className="w-full"
          />
          <input
            className="w-full"
            {...register("password")}
            type="password"
            placeholder="password"
          />
          <button className="mt-2 w-full" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
