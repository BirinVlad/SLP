type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

type TimeSlot = "8:30-10:00" | "10:15-11:45" | "12:15-13:45" | "14:00-15:30" | "15:45-17:15";

type CourseType = "Lecture" | "Seminar" | "Lab" | "Practice";

type Professor = {
  id: number;
  name: string;
  department: string;
};

type Classroom = {
  number: string;
  capacity: number;
  hasProjector: boolean;
};

type Course = {
  id: number;
  name: string;
  type: CourseType;
};

type Lesson = {
  courseId: number;
  professorId: number;
  classroomNumber: string;
  dayOfWeek: DayOfWeek;
  timeSlot: TimeSlot;
};

const professors: Professor[] = [];
const classrooms: Classroom[] = [];
const courses: Course[] = [];
const schedule: Lesson[] = [];


function addProfessor(professor: Professor): void {
  professors.push(professor);
}

// Додавання нового заняття до розкладу, якщо немає конфліктів
function addLesson(lesson: Lesson): boolean {
  const conflict = validateLesson(lesson);
  if (!conflict) {
    schedule.push(lesson);
    return true;
  }
  return false;
}

// Пошук вільних аудиторій у вказаний час та день
function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
  const occupiedClassrooms = schedule
    .filter(lesson => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek)
    .map(lesson => lesson.classroomNumber);
  
  return classrooms
    .filter(classroom => !occupiedClassrooms.includes(classroom.number))
    .map(classroom => classroom.number);
}

// Отримання рокзладу для конкретного професора
function getProfessorSchedule(professorId: number): Lesson[] {
  return schedule.filter(lesson => lesson.professorId === professorId);
}

type ScheduleConflict = {
  type: "ProfessorConflict" | "ClassroomConflict";
  lessonDetails: Lesson;
};

// Функція для перевірки конфліктів
function validateLesson(lesson: Lesson): ScheduleConflict | null {
  // Перевірка на конфлікт з іншим професором
  const professorConflict = schedule.find(
    l => l.professorId === lesson.professorId && l.timeSlot === lesson.timeSlot && l.dayOfWeek === lesson.dayOfWeek
  );
  
  if (professorConflict) {
    return { type: "ProfessorConflict", lessonDetails: professorConflict };
  }

  // Перевірка на конфлікт з аудиторією
  const classroomConflict = schedule.find(
    l => l.classroomNumber === lesson.classroomNumber && l.timeSlot === lesson.timeSlot && l.dayOfWeek === lesson.dayOfWeek
  );
  
  if (classroomConflict) {
    return { type: "ClassroomConflict", lessonDetails: classroomConflict };
  }

  return null; // Немає конфліктів
}

// Відсоток використання аудиторії
function getClassroomUtilization(classroomNumber: string): number {
  const totalLessons = schedule.filter(lesson => lesson.classroomNumber === classroomNumber).length;
  const totalTimeSlots = 5 * classrooms.length; // 5 робочих днів

  return (totalLessons / totalTimeSlots) * 100;
}

// Визначення найпопулярнішого заняття
function getMostPopularCourseType(): CourseType {
  const typeCounts: Record<CourseType, number> = {
    Lecture: 0,
    Seminar: 0,
    Lab: 0,
    Practice: 0
  };

  courses.forEach(course => {
    typeCounts[course.type]++;
  });

  return Object.keys(typeCounts).reduce((a, b) => (typeCounts[a as CourseType] > typeCounts[b as CourseType] ? a : b)) as CourseType;
}

// Зміна аудиторії заняття
function reassignClassroom(lessonId: number, newClassroomNumber: string): boolean {
  const lessonIndex = schedule.findIndex(lesson => lesson.courseId === lessonId);

  if (lessonIndex !== -1) {
    const conflict = schedule.find(
      l => l.classroomNumber === newClassroomNumber && l.timeSlot === schedule[lessonIndex].timeSlot && l.dayOfWeek === schedule[lessonIndex].dayOfWeek
    );
    if (!conflict) {
      schedule[lessonIndex].classroomNumber = newClassroomNumber;
      return true;
    }
  }
  return false;
}

// Скасовування заняття
function cancelLesson(lessonId: number): void {
  const lessonIndex = schedule.findIndex(lesson => lesson.courseId === lessonId);
  if (lessonIndex !== -1) {
    schedule.splice(lessonIndex, 1);
  }
}


///////////////////////////////
addProfessor({ id: 1, name: "Dr. Walter White", department: "Chemistry" });
addProfessor({ id: 2, name: "Dr. Robert J. Oppenheimer", department: "Physics" });

const chemistry: Lesson = {
  courseId: 1,
  professorId: 1,
  classroomNumber: "111",
  dayOfWeek: "Monday",
  timeSlot: "8:30-10:00"
};

const physics: Lesson = {
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

