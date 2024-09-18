"use client";
import { api } from "@/app/_trpc/client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type TSignupUser = z.infer<typeof UserSchema>;

const SignupForm = () => {
  const router = useRouter();
  const signupApi = api.auth.signup.useMutation();
  const { register, formState, handleSubmit } = useForm<TSignupUser>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit: SubmitHandler<TSignupUser> = async (data) => {
    try {
      await signupApi.mutateAsync(data);
      router.replace("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} type="text" placeholder="name" />
        {formState.errors.name?.message && (
          <span>{formState.errors.name.message}</span>
        )}
        <input {...register("email")} type="email" placeholder="email" />
        {formState.errors.email?.message && (
          <span>{formState.errors.email.message}</span>
        )}
        <input
          {...register("password")}
          type="password"
          placeholder="password"
        />
        <button type="submit" disabled={formState.isSubmitting}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
