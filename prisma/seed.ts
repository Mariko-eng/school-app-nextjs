import bcrypt from 'bcrypt';
import { Day, PrismaClient, UserSex } from "@prisma/client";
const prisma = new PrismaClient();

async function hashPassword(password: string) {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
}

async function main() {
  // Create roles
  const superUserRole = await prisma.role.create({
    data: { name: 'Superuser' },
  })
  const adminRole = await prisma.role.create({
    data: { name: 'Admin' },
  })
  const studentRole = await prisma.role.create({
    data: { name: 'Student' },
  })
  const teacherRole = await prisma.role.create({
    data: { name: 'Teacher' },
  })
  const parentRole = await prisma.role.create({
    data: { name: 'Parent' },
  })

    // Hash the passwords before saving them
  const adminPassword = await hashPassword('admin_password')
  const teacherPassword = await hashPassword('teacher_password')
  const studentPassword = await hashPassword('student_password')
  const parentPassword = await hashPassword('parent_password')

  // ADMIN
  const userAdmin1 = await prisma.user.create({
    data: {
      id: "userAdmin1",
      username: "admin1",
      password: adminPassword,
      roleId: adminRole.id,  // Link to the Admin role

      admin: {
        create: {
          id: "adminId1",
          firstName: "AName1",
          lastName: "user",
        }
      }
    },
  });

  // await prisma.admin.create({
  //   data: {
  //     id: "adminId1",
  //     firstName: "AName1",
  //     lastName: "user",
  //     userId: userAdmin1.id,
  //   },
  // })

  // GRADE
  for (let i = 1; i <= 6; i++) {
    await prisma.grade.create({
      data: {
        level: i,
      },
    });
  }

  // CLASS
  for (let i = 1; i <= 6; i++) {
    await prisma.class.create({
      data: {
        name: `${i}A`, 
        gradeId: i, 
        capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
      },
    });
  }

  // SUBJECT
  const subjectData = [
    { name: "Mathematics" },
    { name: "Science" },
    { name: "English" },
    { name: "History" },
    { name: "Geography" },
    { name: "Physics" },
    { name: "Chemistry" },
    { name: "Biology" },
    { name: "Computer Science" },
    { name: "Art" },
  ];

  for (const subject of subjectData) {
    await prisma.subject.create({ data: subject });
  }

  // TEACHER
  for (let i = 1; i <= 15; i++) {
    const userTeacher = await prisma.user.create({
      data: {
        id: `userTeacher${i}`, // Unique ID for the teacher
        username: `teacher${i}`,
        password: teacherPassword,
        roleId: teacherRole.id,  // Link to the Admin role
      },
    });

    await prisma.teacher.create({
      data: {
        id: `teacherId${i}`, // Unique ID for the teacher
        userId: userTeacher.id,
        firstName: `TName${i}`,
        lastName: "user",
        email: `teacher${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Address${i}`,
        bloodType: "A+",
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        subjects: { connect: [{ id: (i % 10) + 1 }] }, 
        classes: { connect: [{ id: (i % 6) + 1 }] }, 
        birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 30)),
      },
    });
  }

  // LESSON
  for (let i = 1; i <= 30; i++) {
    await prisma.lesson.create({
      data: {
        name: `Lesson${i}`, 
        day: Day[
          Object.keys(Day)[
            Math.floor(Math.random() * Object.keys(Day).length)
          ] as keyof typeof Day
        ], 
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)), 
        endTime: new Date(new Date().setHours(new Date().getHours() + 3)), 
        subjectId: (i % 10) + 1, 
        classId: (i % 6) + 1, 
        teacherId: `teacherId${(i % 15) + 1}`, 
      },
    });
  }

  // PARENT
  for (let i = 1; i <= 25; i++) {
    const userParent = await prisma.user.create({
      data: {
        id: `userParent${i}`, // Unique ID for the teacher
        username: `parent${i}`,
        password: parentPassword,
        roleId: parentRole.id,  // Link to the Admin role
      },
    });

    await prisma.parent.create({
      data: {
        id: `parentId${i}`,
        userId: userParent.id,
        firstName: `PName${i}`,
        lastName: "user",
        email: `parent${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Address${i}`,
      },
    });
  }

  // STUDENT
  for (let i = 1; i <= 50; i++) {
    const userStudent = await prisma.user.create({
      data: {
        id: `userStudent${i}`, // Unique ID for the teacher
        username: `student${i}`,
        password: studentPassword,
        roleId: studentRole.id,  // Link to the Admin role
      },
    });

    await prisma.student.create({
      data: {
        id: `studentId${i}`, 
        userId: userStudent.id,
        firstName: `SName${i}`,
        lastName: "user",
        email: `student${i}@example.com`,
        phone: `987-654-321${i}`,
        address: `Address${i}`,
        bloodType: "O-",
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        parentId: `parentId${Math.ceil(i / 2) % 25 || 25}`, 
        gradeId: (i % 6) + 1, 
        classId: (i % 6) + 1, 
        birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
      },
    });
  }

  // EXAM
  for (let i = 1; i <= 10; i++) {
    await prisma.exam.create({
      data: {
        title: `Exam ${i}`, 
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)), 
        endTime: new Date(new Date().setHours(new Date().getHours() + 2)), 
        lessonId: (i % 30) + 1, 
      },
    });
  }

  // ASSIGNMENT
  for (let i = 1; i <= 10; i++) {
    await prisma.assignment.create({
      data: {
        title: `Assignment ${i}`, 
        startDate: new Date(new Date().setHours(new Date().getHours() + 1)), 
        dueDate: new Date(new Date().setDate(new Date().getDate() + 1)), 
        lessonId: (i % 30) + 1, 
      },
    });
  }

  // RESULT
  for (let i = 1; i <= 10; i++) {
    await prisma.result.create({
      data: {
        score: 90, 
        studentId: `studentId${i}`, 
        ...(i <= 5 ? { examId: i } : { assignmentId: i - 5 }), 
      },
    });
  }

  // ATTENDANCE
  for (let i = 1; i <= 10; i++) {
    await prisma.attendance.create({
      data: {
        date: new Date(), 
        present: true, 
        studentId: `studentId${i}`, 
        lessonId: (i % 30) + 1, 
      },
    });
  }

  // EVENT
  for (let i = 1; i <= 5; i++) {
    await prisma.event.create({
      data: {
        title: `Event ${i}`, 
        description: `Description for Event ${i}`, 
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)), 
        endTime: new Date(new Date().setHours(new Date().getHours() + 2)), 
        classId: (i % 5) + 1, 
      },
    });
  }

  // ANNOUNCEMENT
  for (let i = 1; i <= 5; i++) {
    await prisma.announcement.create({
      data: {
        title: `Announcement ${i}`, 
        description: `Description for Announcement ${i}`, 
        date: new Date(), 
        classId: (i % 5) + 1, 
      },
    });
  }

  console.log("Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });