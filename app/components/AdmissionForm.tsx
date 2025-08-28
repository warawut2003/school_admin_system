'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createStudent } from '@/app/actions/studentActions';
import { 
    UserPlusIcon, 
    AcademicCapIcon, 
    CheckCircleIcon, 
    XCircleIcon,
    ArrowLeftIcon 
} from '@heroicons/react/24/outline';

import FormInput from './FormInput'; 
import SubmitButton from './SubmitButton';

export default function AdmissionForm() {
    
    const initialState = { message: '', errors: {} };
    const [state, formAction] = useFormState(createStudent, initialState);
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
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-4">
                        <UserPlusIcon className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">
                        สมัครเข้าศึกษา
                    </h1>
                    <p className="text-slate-600 text-lg">
                        กรอกข้อมูลส่วนตัวเพื่อสมัครเป็นนักศึกษา
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                    {/* Form Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-6">
                        <div className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <AcademicCapIcon className="w-6 h-6" />
                                <h2 className="text-xl font-semibold">แบบฟอร์มข้อมูลนักศึกษา</h2>
                            </div>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-white font-medium transition-all duration-200 group"
                            >
                                <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                                กลับ
                            </Link>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="p-8">
                        <form action={formAction} className="space-y-8">
                            {/* Personal Information Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    ข้อมูลส่วนตัว
                                </h3>
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
                            </div>

                            {/* Academic Information Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                    ข้อมูลการศึกษา
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                </div>
                            </div>

                            {/* Contact Information Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    ข้อมูลติดต่อ
                                </h3>
                                <div className="grid grid-cols-1 gap-6">
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

                            {/* Action Buttons */}
                            <div className="pt-4">
                                <SubmitButton />
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}