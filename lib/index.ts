import inquirer from "inquirer";
import { Student } from "../types/index.js";

// Constants Values

export let students: Student[] = [];
export let offeredCourses: { courseName: string; price: number }[] = [
  {
    courseName: "Artificial Intelligence",
    price: 12000,
  },
  {
    courseName: "Cloud Computing",
    price: 15000,
  },
  {
    courseName: "Blockchain Technology",
    price: 18000,
  },
  {
    courseName: "Internet of Things (IoT)",
    price: 14000,
  },
];
let baseId = 10000;

// function to generate unique for students

export const generateUniqueID = () => {
  // increment the base id and return it
  baseId++;
  return baseId;
};

// return a course object by its name
export const getCourseByName = (courseName: string) => {
  return offeredCourses.find((course) => course.courseName === courseName);
};

// function to create a new student
export const createNewStudent = async () => {
  // Get values using inquirer
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "Enter Students first name: ",
    },
    { type: "input", name: "lastName", message: "Enter Students last name: " },
    {
      type: "list",
      name: "course",
      message: "Select your course: ",
      choices: offeredCourses.map((course) => course.courseName),
    },
    {
      type: "number",
      name: "balance",
      message: "enter the amount of balance you want to deposit: ",
    },
    {
      type: "confirm",
      name: "isFeePaid",
      message: "do you want to pay fees? ",
    },
  ]);
  // destructure values
  const { firstName, lastName, course, balance, isFeePaid } = answer;
  // Get course object using getcoursebyname() function
  const selectedCourse = getCourseByName(course);
  // Generate uniqure student id
  const studentId = generateUniqueID();

  if (!selectedCourse) {
    return null;
  }
  // Construct an object for new student
  const newStudent: Student = {
    firstName: firstName,
    lastName: lastName,
    studentId: studentId,
    courses: [selectedCourse],
    balance: balance,
    isFeePaid: isFeePaid,
  };

  // Push new student object to students array
  students.push(newStudent);
  console.log("Student created successfully");
};

// Utility function to get user by its firstname
export const getStudentByName = async () => {
  const studentName = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter your first name: ",
    },
  ]);
  const { name } = studentName;

  const student = students.find((student) => student.firstName === name);
  return student;
};

// This function logs the status of student
export const showStatus = async () => {
  // Get student by name using getStudentByname() function
  const student = await getStudentByName();
  if (!student) {
    console.log("Student not found");
    return null;
  }

  console.log(`
    Student ID: ${student?.studentId}\n
    Firstname: ${student?.firstName}\n
    Lastname: ${student?.lastName}\n
    courses: ${student?.courses.map((course) => course.courseName)}\n
    balance: ${student?.balance}\n
    Fee paid?: ${student?.isFeePaid}\n
    balance: ${student?.balance}\n
    `);
};

// Function to pay fees
export const payFees = async () => {
  // get student by its name
  const student = await getStudentByName();
  // get student index it students object
  const studentIndex = students.findIndex(
    (student) => student.studentId === student.studentId
  );

  if (!student) {
    console.log("Student not found");
    return;
  }
  const confirm = await inquirer.prompt([
    {
      name: "sure",
      type: "confirm",
      message: "Are you sure you want to pay fees?",
    },
  ]);
  if (confirm.sure) {
    // edit the student object
    student.isFeePaid = true;

    // push it to students array
    students[studentIndex] = student;
    console.log("Fee payed successfully!");
  }
};

export const addBalance = async () => {
  const student = await getStudentByName();
  const studentIndex = students.findIndex(
    (student) => student.studentId === student.studentId
  );
  if (!student) {
    console.log("Student not found");
    return;
  }

  const depositAmount = await inquirer.prompt([
    { name: "amount", type: "number", message: "Enter amount to deposit:" },
  ]);

  student.balance += depositAmount.amount;

  students[studentIndex] = student;
  console.log(
    `Deposited amount ${depositAmount.amount}. New balance is ${student.balance}`
  );
};
