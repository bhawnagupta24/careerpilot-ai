import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Mail } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { authService } from "@/services/auth.service";
import { ROUTES } from "@/utils/constants";

interface FormValues {
  email: string;
}

export function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    try {
      await authService.forgotPassword(values.email);
    } finally {
      setSent(true);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h1 className="font-display text-2xl font-semibold text-ink-50">Reset your password</h1>
      <p className="mt-1.5 text-sm text-ink-400">We'll email you a link to get back in.</p>

      {sent ? (
        <div className="mt-8 flex items-start gap-3 rounded-xl border border-success/30 bg-success/10 p-4 text-sm text-success">
          <CheckCircle2 className="h-4.5 w-4.5 shrink-0" />
          <span>If an account exists for that email, a reset link is on its way.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@college.edu"
            icon={<Mail className="h-4 w-4" />}
            error={errors.email?.message}
            {...register("email", { required: "Email is required" })}
          />
          <Button type="submit" isLoading={isSubmitting} className="mt-2 w-full">
            Send reset link
          </Button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-ink-400">
        <Link to={ROUTES.LOGIN} className="font-medium text-brand-cyan hover:underline">
          Back to log in
        </Link>
      </p>
    </motion.div>
  );
}
