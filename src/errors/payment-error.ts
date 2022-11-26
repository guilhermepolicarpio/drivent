import { ApplicationError } from "@/protocols";

export function paymentError(): ApplicationError {
  return {
    name: "PaymentError",
    message: "You don't have paid yet"
  };
}
