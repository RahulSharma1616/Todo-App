"use server";

import { prisma } from "@/db";

export async function toggleTodo(id: string, complete: boolean) {
  console.log("hari", id, complete);

  await prisma.todo.update({ where: { id }, data: { complete } });
}
