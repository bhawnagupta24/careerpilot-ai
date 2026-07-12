import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, GraduationCap, Lock, Mail, User } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/utils/constants";
import { getErrorMessage } from "@/utils/errorMessage";
import type { RegisterPayload } from "@/types";

export function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterPayload>();

  const onSubmit = async (values: RegisterPayload) => {
    setServerError(null);
    try {
      await registerUser(values);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      setServerError(getErrorMessage(err, "Could not create your account. Please try again."));
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h1 className="font-display text-2xl font-semibold text-ink-50">Create your account</h1>
      <p className="mt-1.5 text-sm text-ink-400">Start building your placement roadmap today.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-4">
        {serverError && (
          <div className="flex items-center gap-2 rounded-xl border border-danger/30 bg-danger/10 px-3.5 py-2.5 text-xs text-danger">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {serverError}
          </div>
        )}

        <Input
          label="Full name"
          placeholder="Aisha Sharma"
          icon={<User className="h-4 w-4" />}
          error={errors.name?.message}
          {...register("name", { required: "Name is required" })}
        />

        <Input
          label="Email"
          type="email"
          placeholder="you@college.edu"
          icon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register("email", { required: "Email is required" })}
        />

        <Input
          label="College (optional)"
          placeholder="IIT Bombay"
          icon={<GraduationCap className="h-4 w-4" />}
          {...register("college")}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Minimum 8 characters"
          icon={<Lock className="h-4 w-4" />}
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Minimum 8 characters" },
          })}
        />

        <Button type="submit" isLoading={isSubmitting} className="mt-2 w-full">
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-400">
        Already have an account?{" "}
        <Link to={ROUTES.LOGIN} className="font-medium text-brand-cyan hover:underline">
          Log in
        </Link>
      </p>
    </motion.div>
  );
}
