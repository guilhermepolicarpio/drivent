import { ApplicationError } from "@/protocols";

export function forbidenError(): ApplicationError {
  return {
    name: "ForbiddenError",
    message: "You don't have permission"
  };
}
