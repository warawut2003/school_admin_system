import Link from 'next/link';
import { getStudents } from '@/app/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import { AcademicCapIcon, PencilIcon, UserIcon } from '@heroicons/react/24/outline';
import DeleteStudent from './components/DeleteButton';

interface Student {
    stdId: string;
    firstName: string;
    lastName: string;
    major: string;
    faculty: string;
    email: string;
    phone: string;
}

export default async function Page() {
    const students: Student[] = await getStudents();

    return (
        <main className="min-h-screen p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50 p-8 mb-8">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100/80 rounded-xl">
                                <AcademicCapIcon className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">ระบบจัดการข้อมูลนักศึกษา</h1>
                                <p className="text-slate-600 mt-1">จัดการและติดตามข้อมูลนักศึกษาทั้งหมด</p>
                            </div>
                        </div>
                        <Link
                            href="/add-student"
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <UserIcon className="w-5 h-5" />
                            เพิ่มนักศึกษาใหม่
                        </Link>
                    </div>
                </div>

                {/* Stats Card */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50 p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-600 text-sm font-medium">จำนวนนักศึกษาทั้งหมด</p>
                            <p className="text-3xl font-bold text-slate-900 mt-1">{students.length.toLocaleString()} คน</p>
                        </div>
                        <div className="p-3 bg-green-100/80 rounded-xl">
                            <UserIcon className="w-8 h-8 text-green-600" />
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50 overflow-hidden">
                    <div className="px-8 py-6 border-b border-slate-200/50">
                        <h2 className="text-xl font-semibold text-slate-900">รายชื่อนักศึกษา</h2>
                        <p className="text-slate-600 mt-1">รายละเอียดข้อมูลนักศึกษาทั้งหมดในระบบ</p>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow className="hover:bg-slate-50/50">
                                    <TableHead className="w-[150px] font-semibold text-slate-700">ชื่อ</TableHead>
                                    <TableHead className="w-[150px] font-semibold text-slate-700">นามสกุล</TableHead>
                                    <TableHead className="w-[200px] font-semibold text-slate-700">สาขาวิชา</TableHead>
                                    <TableHead className="w-[200px] font-semibold text-slate-700">คณะ</TableHead>
                                    <TableHead className="w-[250px] font-semibold text-slate-700">อีเมล</TableHead>
                                    <TableHead className="w-[150px] font-semibold text-slate-700">เบอร์โทรศัพท์</TableHead>
                                    <TableHead className="w-[120px] text-center font-semibold text-slate-700">จัดการ</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {students.length > 0 ? (
                                    students.map((student, index) => (
                                        <TableRow 
                                            key={student.stdId} 
                                            className="hover:bg-slate-50/30 transition-colors duration-150"
                                        >
                                            <TableCell className="font-semibold text-slate-900">{student.firstName}</TableCell>
                                            <TableCell className="text-slate-800">{student.lastName}</TableCell>
                                            <TableCell className="text-slate-700">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100/80 text-blue-800">
                                                    {student.major}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-slate-700">{student.faculty}</TableCell>
                                            <TableCell className="text-slate-600 text-sm">{student.email}</TableCell>
                                            <TableCell className="text-slate-600">{student.phone}</TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex gap-2 justify-center items-center">
                                                    <Link 
                                                        href={`/students/${student.stdId}/edit`}
                                                        className="p-2 hover:bg-blue-50/50 rounded-lg transition-colors duration-150 group"
                                                        title="แก้ไขข้อมูล"
                                                    >
                                                        <PencilIcon className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
                                                    </Link>
                                                    <DeleteStudent id={student.stdId} />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-12">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="p-4 bg-slate-100/50 rounded-full">
                                                    <UserIcon className="w-8 h-8 text-slate-400" />
                                                </div>
                                                <div>
                                                    <p className="text-slate-600 font-medium">ไม่พบข้อมูลนักศึกษา</p>
                                                    <p className="text-slate-500 text-sm mt-1">เพิ่มข้อมูลนักศึกษาคนแรกของคุณ</p>
                                                </div>
                                                <Link
                                                    href="/add-student"
                                                    className="mt-2 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                                                >
                                                    <UserIcon className="w-4 h-4" />
                                                    เพิ่มนักศึกษา
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </main>
    );
}