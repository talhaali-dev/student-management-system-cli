/*
    1. Project Setup ✅
    2. Main function ✅
    3. Create new Student ✅
    4. Generate Unique student ID ✅
    5. Deposit student balance  ✅
    6. pay student fees✅
    7. ShowStatus function ✅
*/

// Import statements
import inquirer from "inquirer";
import { Student } from "./types/index.js";
import {
  addBalance,
  createNewStudent,
  payFees,
  showStatus,
} from "./lib/index.js";

// Main functions
const mainFun = async () => {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What do you want to do?",
      choices: [
        "Create New Student",
        "View Student Status",
        "Pay Fees",
        "Deposit balance",
        "quit",
      ],
    },
  ]);

  const { action } = answers;
  if (action === "Create New Student") {
    await createNewStudent();
    await mainFun();
  } else if (action === "View Student Status") {
    await showStatus();
    await mainFun();
  } else if (action === "Pay Fees") {
    await payFees();
    await mainFun();
  } else if (action === "Deposit balance") {
    await addBalance();
    await mainFun();
  } else if (action === "quit") {
    return null;
  }
};

mainFun();
