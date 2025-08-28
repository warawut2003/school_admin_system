'use client';

import { useActionState } from 'react';
import { createStudent } from '@/app/actions/studentActions';

import FormInput from './FormInput'; 
import SubmitButton from './SubmitButton';

export default function AdmissionForm() {
    // ใช้ useFormState เพื่อจัดการสถานะของ Server Action
    const initialState = { message: '', errors: {} };
    const [state, formAction] = useActionState(createStudent, initialState);

    return (
        <div className="max-w-xl mx-auto p-8 rounded-xl shadow-2xl bg-white mt-10">
            <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
                แบบฟอร์มรับสมัครนักศึกษา
            </h1>
            <form action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                        label="ชื่อ"
                        name="firstName"
                        type="text"
                        errors={state?.errors?.firstName}
                    />
                    <FormInput
                        label="นามสกุล"
                        name="lastName"
                        type="text"
                        errors={state?.errors?.lastName}
                    />
                </div>
                <FormInput
                    label="สาขาวิชา"
                    name="major"
                    type="text"
                    errors={state?.errors?.major}
                />
                <FormInput
                    label="คณะ"
                    name="faculty"
                    type="text"
                    errors={state?.errors?.faculty}
                />
                <FormInput
                    label="อีเมล"
                    name="email"
                    type="email"
                    errors={state?.errors?.email}
                />
                <FormInput
                    label="เบอร์โทรศัพท์"
                    name="phone"
                    type="tel"
                    errors={state?.errors?.phone}
                />
                {/* แก้ไขบรรทัดนี้เพื่อป้องกันข้อผิดพลาด */}
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
