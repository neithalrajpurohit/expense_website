import { router } from "@/server/api/trpc";
import { userRouter } from "@/server/api/routes/user";
import { authRouter } from "./routes/auth";

export const appRouter = router({
  user: userRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
