'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateStudent } from '@/app/actions/studentActions';
import FormInput from './FormInput'; 
import SubmitButton from './SubmitButton';
import { ArrowLeftIcon, CheckCircleIcon, PencilSquareIcon, UserIcon, XCircleIcon } from '@heroicons/react/24/outline';

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
    
    const [state, formAction] = useFormState(updateStudentWithId, initialState);
    const router = useRouter();

    useEffect(() => {
        if (state.message.includes('สำเร็จ')) {
            router.push('/');
        }
    }, [state.message, router]);

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-2xl">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl mb-4">
                        <PencilSquareIcon className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">
                        แก้ไขข้อมูลนักศึกษา
                    </h1>
                    <p className="text-slate-600 text-lg">
                        อัปเดตข้อมูลส่วนตัวและข้อมูลการศึกษา
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                    {/* Form Header */}
                    <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-6">
                        <div className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <UserIcon className="w-6 h-6" />
                                <div>
                                    <h2 className="text-xl font-semibold">แก้ไขข้อมูล</h2>
                                    <p className="text-amber-100 text-sm">
                                        {student.firstName} {student.lastName}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => router.push('/')}
                                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium"
                            >
                                <ArrowLeftIcon className="w-4 h-4" />
                                กลับ
                            </button>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="p-8">
                        <form action={formAction} className="space-y-8">
                            {/* Personal Information Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                    ข้อมูลส่วนตัว
                                </h3>
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
                            </div>

                            {/* Academic Information Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                    ข้อมูลการศึกษา
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                </div>
                            </div>

                            {/* Contact Information Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    ข้อมูลติดต่อ
                                </h3>
                                <div className="grid grid-cols-1 gap-6">
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
                                </div>
                            </div>

                            {/* Current Data Display */}
                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                                    ข้อมูลปัจจุบัน
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-slate-600">ชื่อ-นามสกุล:</span>
                                        <span className="ml-2 font-medium text-slate-800">
                                            {student.firstName} {student.lastName}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-slate-600">สาขาวิชา:</span>
                                        <span className="ml-2 font-medium text-slate-800">
                                            {student.major}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-slate-600">คณะ:</span>
                                        <span className="ml-2 font-medium text-slate-800">
                                            {student.faculty}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-slate-600">อีเมล:</span>
                                        <span className="ml-2 font-medium text-slate-800">
                                            {student.email}
                                        </span>
                                    </div>
                                    <div className="md:col-span-2">
                                        <span className="text-slate-600">เบอร์โทรศัพท์:</span>
                                        <span className="ml-2 font-medium text-slate-800">
                                            {student.phone}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Status Message */}
                            {state?.message && Object.keys(state.errors ?? {}).length === 0 && (
                                <div className={`flex items-center gap-3 p-4 rounded-xl ${
                                    state.message.includes('สำเร็จ') 
                                        ? 'bg-green-50 border border-green-200' 
                                        : 'bg-red-50 border border-red-200'
                                }`}>
                                    {state.message.includes('สำเร็จ') ? (
                                        <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                                    ) : (
                                        <XCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
                                    )}
                                    <p className={`font-medium ${
                                        state.message.includes('สำเร็จ') ? 'text-green-800' : 'text-red-800'
                                    }`}>
                                        {state.message}
                                    </p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="pt-4">
                                <SubmitButton />
                            </div>
                        </form>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="text-center mt-8">
                    <p className="text-slate-500 text-sm">
                        การแก้ไขข้อมูลจะมีผลทันทีหลังจากบันทึกเสร็จสิ้น
                    </p>
                </div>
            </div>
        </div>
    );
}