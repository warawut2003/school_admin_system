'use client';

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { updateStudent } from '@/app/actions/studentActions';
import FormInput from './FormInput'; 
import SubmitButton from './SubmitButton';

// กำหนด type สำหรับ props
interface Student {
    id: string;
    firstName: string;
    lastName: string;
    major: string;
    faculty: string;
    email: string;
    phone: string;
}

export default function EditStudentForm({ student }: { student: Student }) {
    const updateStudentWithId = updateStudent.bind(null, student.id);
    const initialState = { message: '', errors: {} };
    const [state, formAction] = useActionState(updateStudentWithId, initialState);

    return (
        <div className="max-w-xl mx-auto p-8 rounded-xl shadow-2xl bg-white mt-10">
            <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
                แบบฟอร์มแก้ไขข้อมูลนักศึกษา
            </h1>
            <form action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                        label="ชื่อ"
                        name="firstName"
                        type="text"
                        errors={state?.errors?.firstName}
                        defaultValue={student.firstName}
                    />
                    <FormInput
                        label="นามสกุล"
                        name="lastName"
                        type="text"
                        errors={state?.errors?.lastName}
                        defaultValue={student.lastName}
                    />
                </div>
                <FormInput
                    label="สาขาวิชา"
                    name="major"
                    type="text"
                    errors={state?.errors?.major}
                    defaultValue={student.major}
                />
                <FormInput
                    label="คณะ"
                    name="faculty"
                    type="text"
                    errors={state?.errors?.faculty}
                    defaultValue={student.faculty}
                />
                <FormInput
                    label="อีเมล"
                    name="email"
                    type="email"
                    errors={state?.errors?.email}
                    defaultValue={student.email}
                />
                <FormInput
                    label="เบอร์โทรศัพท์"
                    name="phone"
                    type="tel"
                    errors={state?.errors?.phone}
                    defaultValue={student.phone}
                />
                {state?.message && Object.keys(state.errors ?? {}).length === 0 && (
                    <p className={`text-center font-bold ${state.message.includes('สำเร็จ') ? 'text-green-500' : 'text-red-500'}`}>
                        {state.message}
                    </p>
                )}
                <SubmitButton />
            </form>
        </div>
    );
}