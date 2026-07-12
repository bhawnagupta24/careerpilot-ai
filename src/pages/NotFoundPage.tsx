import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/utils/constants";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-base-950 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient-soft">
        <Rocket className="h-6 w-6 rotate-45 text-brand-cyan" />
      </div>
      <h1 className="font-display text-4xl font-semibold text-ink-50">404</h1>
      <p className="max-w-sm text-sm text-ink-400">
        Looks like this flight path doesn't exist. Let's get you back on course.
      </p>
      <Link to={ROUTES.HOME}>
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}
