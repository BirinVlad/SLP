"use strict";
const professors = [];
const classrooms = [];
const courses = [];
const schedule = [];
function addProfessor(professor) {
    professors.push(professor);
}
// Додавання нового заняття до розкладу, якщо немає конфліктів
function addLesson(lesson) {
    const conflict = validateLesson(lesson);
    if (!conflict) {
        schedule.push(lesson);
        return true;
    }
    return false;
}
// Пошук вільних аудиторій у вказаний час та день
function findAvailableClassrooms(timeSlot, dayOfWeek) {
    const occupiedClassrooms = schedule
        .filter(lesson => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek)
        .map(lesson => lesson.classroomNumber);
    return classrooms
        .filter(classroom => !occupiedClassrooms.includes(classroom.number))
        .map(classroom => classroom.number);
}
// Отримання рокзладу для конкретного професора
function getProfessorSchedule(professorId) {
    return schedule.filter(lesson => lesson.professorId === professorId);
}
// Функція для перевірки конфліктів
function validateLesson(lesson) {
    // Перевірка на конфлікт з іншим професором
    const professorConflict = schedule.find(l => l.professorId === lesson.professorId && l.timeSlot === lesson.timeSlot && l.dayOfWeek === lesson.dayOfWeek);
    if (professorConflict) {
        return { type: "ProfessorConflict", lessonDetails: professorConflict };
    }
    // Перевірка на конфлікт з аудиторією
    const classroomConflict = schedule.find(l => l.classroomNumber === lesson.classroomNumber && l.timeSlot === lesson.timeSlot && l.dayOfWeek === lesson.dayOfWeek);
    if (classroomConflict) {
        return { type: "ClassroomConflict", lessonDetails: classroomConflict };
    }
    return null; // Немає конфліктів
}
// Відсоток використання аудиторії
function getClassroomUtilization(classroomNumber) {
    const totalLessons = schedule.filter(lesson => lesson.classroomNumber === classroomNumber).length;
    const totalTimeSlots = 5 * classrooms.length; // 5 робочих днів
    return (totalLessons / totalTimeSlots) * 100;
}
// Визначення найпопулярнішого заняття
function getMostPopularCourseType() {
    const typeCounts = {
        Lecture: 0,
        Seminar: 0,
        Lab: 0,
        Practice: 0
    };
    courses.forEach(course => {
        typeCounts[course.type]++;
    });
    return Object.keys(typeCounts).reduce((a, b) => (typeCounts[a] > typeCounts[b] ? a : b));
}
// Зміна аудиторії заняття
function reassignClassroom(lessonId, newClassroomNumber) {
    const lessonIndex = schedule.findIndex(lesson => lesson.courseId === lessonId);
    if (lessonIndex !== -1) {
        const conflict = schedule.find(l => l.classroomNumber === newClassroomNumber && l.timeSlot === schedule[lessonIndex].timeSlot && l.dayOfWeek === schedule[lessonIndex].dayOfWeek);
        if (!conflict) {
            schedule[lessonIndex].classroomNumber = newClassroomNumber;
            return true;
        }
    }
    return false;
}
// Скасовування заняття
function cancelLesson(lessonId) {
    const lessonIndex = schedule.findIndex(lesson => lesson.courseId === lessonId);
    if (lessonIndex !== -1) {
        schedule.splice(lessonIndex, 1);
    }
}
///////////////////////////////
addProfessor({ id: 1, name: "Dr. Walter White", department: "Chemistry" });
addProfessor({ id: 2, name: "Dr. Robert J. Oppenheimer", department: "Physics" });
const chemistry = {
    courseId: 1,
    professorId: 1,
    classroomNumber: "111",
    dayOfWeek: "Monday",
    timeSlot: "8:30-10:00"
};
const physics = {
    courseId: 2,
    professorId: 2,
    classroomNumber: "222",
    dayOfWeek: "Wednesday",
    timeSlot: "10:15-11:45"
};
addLesson(chemistry);
addLesson(physics);
console.log("Professors:", professors);
console.log("Schedule:", schedule);
//# sourceMappingURL=index.js.map