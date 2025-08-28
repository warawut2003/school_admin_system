'use server';

import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

const studentSchema = z.object({
    firstName: z.string().min(1, { message: "กรุณาระบุชื่อ" }),
    lastName: z.string().min(1, { message: "กรุณาระบุนามสกุล" }),
    major: z.string().min(1, { message: "กรุณาระบุสาขาวิชา" }),
    faculty: z.string().min(1, { message: "กรุณาระบุคณะ" }),
    email: z.string().email({ message: "รูปแบบอีเมลไม่ถูกต้อง" }),
    phone: z.string().min(10, { message: "กรุณาระบุเบอร์โทรศัพท์ที่ถูกต้อง" }),
});

export async function createStudent(_: any, formData: FormData) {
    const rawData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        major: formData.get('major'),
        faculty: formData.get('faculty'),
        email: formData.get('email'),
        phone: formData.get('phone'),
    };

    const validatedFields = studentSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง',
        };
    }

    try {
        await prisma.student.create({
            data: {
                firstName: validatedFields.data.firstName,
                lastName: validatedFields.data.lastName,
                major: validatedFields.data.major,
                faculty: validatedFields.data.faculty,
                email: validatedFields.data.email,
                phone: validatedFields.data.phone,
            },
        });
        
        revalidatePath('/students'); 

        return { message: 'เพิ่มข้อมูลนักศึกษาสำเร็จ' };
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('P2002')) {
                return {
                    message: 'อีเมลนี้ถูกใช้ไปแล้ว กรุณาใช้อีเมลอื่น',
                };
            }
        }
        return { message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' };
    }
}

export async function updateStudent(id: string, _: any, formData: FormData) {
    const rawData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        major: formData.get('major'),
        faculty: formData.get('faculty'),
        email: formData.get('email'),
        phone: formData.get('phone'),
    };

    const validatedFields = studentSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง',
        };
    }

    try {
        await prisma.student.update({
            where: { stdId: id },
            data: {
                firstName: validatedFields.data.firstName,
                lastName: validatedFields.data.lastName,
                major: validatedFields.data.major,
                faculty: validatedFields.data.faculty,
                email: validatedFields.data.email,
                phone: validatedFields.data.phone,
            },
        });

        revalidatePath('/students');
        return { message: 'แก้ไขข้อมูลนักศึกษาสำเร็จ' };
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('P2002')) {
                return {
                    message: 'อีเมลนี้ถูกใช้ไปแล้ว กรุณาใช้อีเมลอื่น',
                };
            }
        }
        return { message: 'เกิดข้อผิดพลาดในการแก้ไขข้อมูล' };
    }
}

export async function deleteStudent(_: FormData, id: string) {
    try {
        await prisma.student.delete({
            where: { stdId: id },
        });

        revalidatePath('/students');
        return { message: 'ลบข้อมูลนักศึกษาสำเร็จ' };
    } catch (error) {
        console.error('Failed to delete student:', error);
        return { message: 'เกิดข้อผิดพลาดในการลบข้อมูล' };
    }
}

