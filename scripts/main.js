"use strict";
// enums
var StudentStatus;
(function (StudentStatus) {
    StudentStatus["Active"] = "Active";
    StudentStatus["Academic_Leave"] = "Academic_Leave";
    StudentStatus["Graduated"] = "Graduated";
    StudentStatus["Expelled"] = "Expelled";
})(StudentStatus || (StudentStatus = {}));
var CourseType;
(function (CourseType) {
    CourseType["Mandatory"] = "Mandatory";
    CourseType["Optional"] = "Optional";
    CourseType["Special"] = "Special";
})(CourseType || (CourseType = {}));
var Semester;
(function (Semester) {
    Semester["First"] = "First";
    Semester["Second"] = "Second";
})(Semester || (Semester = {}));
var Grade;
(function (Grade) {
    Grade[Grade["Excellent"] = 5] = "Excellent";
    Grade[Grade["Good"] = 4] = "Good";
    Grade[Grade["Satisfactory"] = 3] = "Satisfactory";
    Grade[Grade["Unsatisfactory"] = 2] = "Unsatisfactory";
})(Grade || (Grade = {}));
var Faculty;
(function (Faculty) {
    Faculty["Software_Engineering"] = "Software_Engennering";
    Faculty["Economics"] = "Economics";
    Faculty["Law"] = "Law";
    Faculty["Design"] = "Design";
})(Faculty || (Faculty = {}));
class UniversityManagementSystem {
    constructor() {
        this.students = [];
        this.courses = [];
        this.grades = [];
        this.courseRegistrations = new Map(); // <studentId, Set<courseId>>
        this.nextStudentId = 1;
        this.nextCourseId = 1;
    }
    // student register
    enrollStudent(student) {
        const newStudent = Object.assign({ id: this.nextStudentId++ }, student);
        this.students.push(newStudent);
        return newStudent;
    }
    registerForCourse(studentId, courseId) {
        const student = this.students.find((s) => s.id === studentId);
        const course = this.courses.find((c) => c.id === courseId);
        if (!student || !course)
            throw new Error('Student or Course not found');
        if (student.faculty !== course.faculty)
            throw new Error('Student and course faculty do not match');
        if (!this.courseRegistrations.has(courseId))
            this.courseRegistrations.set(courseId, new Set());
        const registrations = this.courseRegistrations.get(courseId);
        if (registrations.size >= course.maxStudents)
            throw new Error('Course has reached maximum student capacity');
        registrations.add(studentId);
    }
    setGrade(studentId, courseId, grade) {
        const registrations = this.courseRegistrations.get(courseId);
        if (!registrations || !registrations.has(studentId))
            throw new Error('Student is not registered for this course');
        this.grades.push({
            studentId,
            courseId,
            grade,
            date: new Date(),
            semester: this.courses.find((c) => c.id === courseId).semester,
        });
    }
    updateStudentStatus(studentId, newStatus) {
        const student = this.students.find((s) => s.id === studentId);
        if (!student)
            throw new Error('Student not found');
        // status validation
        if (student.status === StudentStatus.Graduated || student.status === StudentStatus.Expelled)
            throw new Error('Cannot change status of graduated or expelled students');
        student.status = newStatus;
    }
    getStudentsByFaculty(faculty) {
        return this.students.filter((student) => student.faculty === faculty);
    }
    getStudentGrades(studentId) {
        return this.grades.filter((grade) => grade.studentId === studentId);
    }
    getAvailableCourses(faculty, semester) {
        return this.courses.filter((course) => course.faculty === faculty && course.semester === semester);
    }
    calculateAverageGrade(studentId) {
        const studentGrades = this.getStudentGrades(studentId);
        if (studentGrades.length === 0)
            return 0;
        const total = studentGrades.reduce((sum, grade) => sum + grade.grade, 0);
        return total / studentGrades.length;
    }
    getTopStudentsByFaculty(faculty) {
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
const course = {
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
