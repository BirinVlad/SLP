// enums
enum StudentStatus {
  Active = 'Active',
  Academic_Leave = 'Academic_Leave',
  Graduated = 'Graduated',
  Expelled = 'Expelled',
}

enum CourseType {
  Mandatory = 'Mandatory',
  Optional = 'Optional',
  Special = 'Special',
}

enum Semester {
  First = 'First',
  Second = 'Second',
}

enum Grade {
  Excellent = 5,
  Good = 4,
  Satisfactory = 3,
  Unsatisfactory = 2,
}

enum Faculty {
  Software_Engineering = 'Software_Engennering',
  Economics = 'Economics',
  Law = 'Law',
  Design = 'Design',
}

// interfaces
interface Student {
  id: number;
  fullName: string;
  faculty: Faculty;
  year: number;
  status: StudentStatus;
  enrollmentDate: Date;
  groupNumber: string;
}

interface Course {
  id: number;
  name: string;
  type: CourseType;
  credits: number;
  semester: Semester;
  faculty: Faculty;
  maxStudents: number;
}

interface StudentGrade {
  studentId: number;
  courseId: number;
  grade: Grade;
  date: Date;
  semester: Semester;
}

class UniversityManagementSystem {
  private students: Student[] = [];
  private courses: Course[] = [];
  private grades: StudentGrade[] = [];
  private courseRegistrations: Map<number, Set<number>> = new Map(); // <studentId, Set<courseId>>

  private nextStudentId = 1;
  private nextCourseId = 1;

  // student register
  enrollStudent(student: Omit<Student, 'id'>): Student {
    const newStudent: Student = { id: this.nextStudentId++, ...student };
    this.students.push(newStudent);
    return newStudent;
  }

  registerForCourse(studentId: number, courseId: number): void {
    const student = this.students.find((s) => s.id === studentId);
    const course = this.courses.find((c) => c.id === courseId);

    if (!student || !course) throw new Error('Student or Course not found');
    if (student.faculty !== course.faculty)
      throw new Error('Student and course faculty do not match');
    if (!this.courseRegistrations.has(courseId)) this.courseRegistrations.set(courseId, new Set());

    const registrations = this.courseRegistrations.get(courseId)!;
    if (registrations.size >= course.maxStudents)
      throw new Error('Course has reached maximum student capacity');

    registrations.add(studentId);
  }

  setGrade(studentId: number, courseId: number, grade: Grade): void {
    const registrations = this.courseRegistrations.get(courseId);
    if (!registrations || !registrations.has(studentId))
      throw new Error('Student is not registered for this course');

    this.grades.push({
      studentId,
      courseId,
      grade,
      date: new Date(),
      semester: this.courses.find((c) => c.id === courseId)!.semester,
    });
  }

  updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
    const student = this.students.find((s) => s.id === studentId);
    if (!student) throw new Error('Student not found');

    // status validation
    if (student.status === StudentStatus.Graduated || student.status === StudentStatus.Expelled)
      throw new Error('Cannot change status of graduated or expelled students');

    student.status = newStatus;
  }

  getStudentsByFaculty(faculty: Faculty): Student[] {
    return this.students.filter((student) => student.faculty === faculty);
  }

  getStudentGrades(studentId: number): StudentGrade[] {
    return this.grades.filter((grade) => grade.studentId === studentId);
  }

  getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
    return this.courses.filter(
      (course) => course.faculty === faculty && course.semester === semester
    );
  }

  calculateAverageGrade(studentId: number): number {
    const studentGrades = this.getStudentGrades(studentId);
    if (studentGrades.length === 0) return 0;

    const total = studentGrades.reduce((sum, grade) => sum + grade.grade, 0);
    return total / studentGrades.length;
  }

  getTopStudentsByFaculty(faculty: Faculty): Student[] {
    return this.students.filter((student) => {
      const avgGrade = this.calculateAverageGrade(student.id);
      return student.faculty === faculty && avgGrade >= Grade.Excellent;
    });
  }
}

/////////

const ums = new UniversityManagementSystem();

// student register
const student = ums.enrollStudent({
  fullName: 'Vlad Byryn',
  faculty: Faculty.Software_Engineering,
  year: 2,
  status: StudentStatus.Active,
  enrollmentDate: new Date(),
  groupNumber: 'PD-44',
});

// add course
const course: Course = {
  id: 1,
  name: 'Game Development C#',
  type: CourseType.Mandatory,
  credits: 5,
  semester: Semester.First,
  faculty: Faculty.Software_Engineering,
  maxStudents: 30,
};

ums.registerForCourse(student.id, course.id);

ums.setGrade(student.id, course.id, Grade.Excellent);

// get average grade
const averageGrade = ums.calculateAverageGrade(student.id);
console.log('Average Grade:', averageGrade);

// Список відмінників
const topStudents = ums.getTopStudentsByFaculty(Faculty.Software_Engineering);
console.log('Top Students:', topStudents);

