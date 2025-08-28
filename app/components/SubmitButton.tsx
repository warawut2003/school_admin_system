'use client';

import { useFormStatus } from 'react-dom';


export default function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors"
            disabled={pending} // ปิดการใช้งานปุ่มเมื่อกำลังประมวลผล
        >
            {pending ? 'กำลังเพิ่มข้อมูล...' : 'เพิ่มข้อมูลนักศึกษา'}
        </button>
    );
}