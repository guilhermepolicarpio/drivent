import { prisma } from "@/config";
import { Payment, Prisma } from "@prisma/client";

async function postPayment(newPayment: NewPayment) {
  return prisma.payment.create({ data: newPayment });
}

export type NewPayment = Omit<Payment, "id" | "createdAt" |"updatedAt">

const paymentsRepository={
  postPayment
};

export default paymentsRepository;
