'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteStudent } from '@/app/actions/studentActions';
import { useState } from 'react';

export default function DeleteStudent({ id }: { id: string }) {
    
    const [isDeleting, setIsDeleting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');

    // ฟังก์ชันสำหรับจัดการการลบ
    const handleDelete = async () => {
        setIsDeleting(true);
        const result = await deleteStudent(id);
        setMessage(result.message);
        setShowModal(false);
        setIsDeleting(false);
    };

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-lg transition-colors flex items-center gap-1"
                disabled={isDeleting}
            >
                {isDeleting ? 'กำลังลบ...' : <TrashIcon className="w-5 h-5" />}
                <span className="hidden md:inline">ลบ</span>
            </button>

            {/* Modal ยืนยันการลบ */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
                        <h2 className="text-xl font-bold mb-4">ยืนยันการลบ</h2>
                        <p className="mb-6">คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้? การกระทำนี้ไม่สามารถย้อนกลับได้</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors"
                            >
                                ยกเลิก
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                            >
                                ยืนยัน
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
