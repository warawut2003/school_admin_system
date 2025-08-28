import EditStudentForm from '@/app/components/EditStudentForm';
import { getStudentById } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const studentData = await getStudentById(id);

    // เพิ่มเงื่อนไขการตรวจสอบว่ามีข้อมูลนักเรียนหรือไม่
    if (!studentData) {
        return <div className="text-center text-red-500">ไม่พบข้อมูลนักเรียน</div>;
    }

    // Mapping ข้อมูลให้ตรงกับ Student interface
    const student = {
        id: studentData.stdId, // อัปเดตเพื่อให้ตรงกับ property ของคุณ
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        major: studentData.major,
        faculty: studentData.faculty,
        email: studentData.email,
        phone: studentData.phone,
    };

    return (
        <div className="flex justify-center items-center py-12">
            <EditStudentForm student={student} />
        </div>
    );
}
