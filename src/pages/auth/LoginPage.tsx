import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/utils/constants";
import { getErrorMessage } from "@/utils/errorMessage";
import type { LoginPayload } from "@/types";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>();

  const onSubmit = async (values: LoginPayload) => {
    setServerError(null);
    try {
      await login(values);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      setServerError(getErrorMessage(err, "Invalid email or password. Please try again."));
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h1 className="font-display text-2xl font-semibold text-ink-50">Welcome back</h1>
      <p className="mt-1.5 text-sm text-ink-400">Log in to continue your roadmap.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-4">
        {serverError && (
          <div className="flex items-center gap-2 rounded-xl border border-danger/30 bg-danger/10 px-3.5 py-2.5 text-xs text-danger">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {serverError}
          </div>
        )}

        <Input
          label="Email"
          type="email"
          placeholder="you@college.edu"
          icon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register("email", { required: "Email is required" })}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          icon={<Lock className="h-4 w-4" />}
          error={errors.password?.message}
          {...register("password", { required: "Password is required" })}
        />

        <div className="flex items-center justify-end">
          <Link to={ROUTES.FORGOT_PASSWORD} className="text-xs text-brand-cyan hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" isLoading={isSubmitting} className="mt-2 w-full">
          Log in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-400">
        Don't have an account?{" "}
        <Link to={ROUTES.REGISTER} className="font-medium text-brand-cyan hover:underline">
          Sign up
        </Link>
      </p>
    </motion.div>
  );
}
