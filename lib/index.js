import inquirer from "inquirer";
// Constants Values
export let students = [];
export let offeredCourses = [
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
export const generateUniqueID = () => {
    baseId++;
    return baseId;
};
export const getCourseByName = (courseName) => {
    return offeredCourses.find((course) => course.courseName === courseName);
};
export const createNewStudent = async () => {
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
    const { firstName, lastName, course, balance, isFeePaid } = answer;
    const selectedCourse = getCourseByName(course);
    const studentId = generateUniqueID();
    if (!selectedCourse) {
        return null;
    }
    const newStudent = {
        firstName: firstName,
        lastName: lastName,
        studentId: studentId,
        courses: [selectedCourse],
        balance: balance,
        isFeePaid: isFeePaid,
    };
    students.push(newStudent);
    console.log("Student created successfully");
};
export const getStudentByName = async () => {
    const studentName = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter your name",
        },
    ]);
    const { name } = studentName;
    const student = students.find((student) => student.firstName === name);
    return student;
};
export const showStatus = async () => {
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
export const payFees = async () => {
    const student = await getStudentByName();
    const studentIndex = students.findIndex((student) => student.studentId === student.studentId);
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
        student.isFeePaid = true;
        students[studentIndex] = student;
        console.log("Fee payed successfully!");
    }
};
export const addBalance = async () => {
    const student = await getStudentByName();
    const studentIndex = students.findIndex((student) => student.studentId === student.studentId);
    if (!student) {
        console.log("Student not found");
        return;
    }
    const depositAmount = await inquirer.prompt([
        { name: "amount", type: "number", message: "Enter amount to deposit:" },
    ]);
    student.balance += depositAmount.amount;
    students[studentIndex] = student;
    console.log(`Deposited amount ${depositAmount.amount}. New balance is ${student.balance}`);
};
