import { AxiosError } from "axios";

interface ValidationErrorItem {
  field: string;
  message: string;
}

/**
 * Extracts the best available human-readable message from an error thrown
 * by an Axios call to the CareerPilot AI backend. Falls back gracefully.
 */
export function getErrorMessage(err: unknown, fallback = "Something went wrong. Please try again."): string {
  if (err instanceof AxiosError) {
    const data = err.response?.data as
      | { message?: string; data?: { errors?: ValidationErrorItem[] } }
      | undefined;

    if (data?.data?.errors?.length) {
      return data.data.errors.map((e) => e.message).join(", ");
    }
    if (data?.message) return data.message;
    if (err.message === "Network Error") {
      return "Can't reach the server. Make sure the backend is running.";
    }
  }
  if (err instanceof Error && err.message) return err.message;
  return fallback;
}
