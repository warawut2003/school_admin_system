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
import { PencilIcon } from '@heroicons/react/24/outline';
import DeleteStudentForm from '@/app/components/DeleteStudentForm'; // นำเข้าคอมโพเนนต์ใหม่

export default async function Page() {
    const students = await getStudents();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full max-w-7xl">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-800">ข้อมูลนักศึกษา</h1>
                    <Link
                        href="/add-student"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                        + เพิ่มนักศึกษา
                    </Link>
                </div>

                <div className="overflow-x-auto shadow-xl rounded-xl">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[150px]">ชื่อ</TableHead>
                                <TableHead className="w-[150px]">นามสกุล</TableHead>
                                <TableHead className="w-[200px]">สาขาวิชา</TableHead>
                                <TableHead className="w-[200px]">คณะ</TableHead>
                                <TableHead className="w-[250px]">อีเมล</TableHead>
                                <TableHead className="w-[150px]">เบอร์โทรศัพท์</TableHead>
                                <TableHead className="w-[100px] text-center">การกระทำ</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.length > 0 ? (
                                students.map((student) => (
                                    <TableRow key={student.stdId}>
                                        <TableCell className="font-medium">{student.firstName}</TableCell>
                                        <TableCell>{student.lastName}</TableCell>
                                        <TableCell>{student.major}</TableCell>
                                        <TableCell>{student.faculty}</TableCell>
                                        <TableCell>{student.email}</TableCell>
                                        <TableCell>{student.phone}</TableCell>
                                        <TableCell className="text-center flex gap-2 justify-center">
                                            <Link href={`/students/${student.stdId}/edit`}>
                                                <PencilIcon className="w-5 h-5 text-blue-500 hover:text-blue-600 transition-colors" />
                                            </Link>
                                            <DeleteStudentForm studentId={student.stdId} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center">ไม่พบข้อมูลนักศึกษา</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </main>
    );
}
