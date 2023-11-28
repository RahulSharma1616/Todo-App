//Code to delete table named "todo" from the datatbase

import { PrismaClient } from "@prisma/client";
import inquirer from "inquirer";

const prisma = new PrismaClient();

async function confirmDelete() {
  const answer = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirmation",
      message: "Are you sure you want to delete the table and all its entries?",
      default: false,
    },
  ]);
  return answer.confirmation;
}

async function deleteTable() {
  try {
    //Confirm the deletion
    if(!(await confirmDelete())) {
        console.log('Operation aborted.');
        return;
    }

    // First remove all the data in table
    await prisma.todo.deleteMany();

    // Then, delete the table
    await prisma.$executeRaw`DROP TABLE IF EXISTS "todo"`;

    console.log("Records deleted successfylly.");
  } catch (err) {
    console.error("error deleting records,", err);
  } finally {
    // Disconnect
    await prisma.$disconnect();
  }
}

deleteTable();
