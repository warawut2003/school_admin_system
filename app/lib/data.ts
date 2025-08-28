import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getStudents() {
    try {
        const students = await prisma.student.findMany({
            orderBy: {
                createdAt: 'desc', // เรียงลำดับจากใหม่ไปเก่า
            },
        });
        return students;
    } catch (error) {
        console.error('Failed to fetch students:', error);
        return [];
    }
}

export async function getStudentById(id: string) {
    try {
        const student = await prisma.student.findUnique({
            where: {
                stdId: id,
            },
        });
        return student;
    } catch (error) {
        console.error('Failed to fetch student by ID:', error);
        return null;
    }
}
