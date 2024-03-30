// Student type
export interface Student {
  firstName: string;
  lastName: string;
  studentId: number;
  courses: [
    {
      courseName: string;
      price: number;
    }
  ];
  balance: number;
  isFeePaid: boolean;
}
