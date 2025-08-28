'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import { useFormStatus } from 'react-dom';
import { deleteStudent } from '@/app/actions/studentActions';

export default function DeleteStudentForm({ studentId }: { studentId: string }) {
  const { pending } = useFormStatus();

  return (
    <form action={deleteStudent.bind(null, studentId)}>
      <button 
        type="submit" 
        disabled={pending} 
        className="text-red-500 hover:text-red-600 transition-colors"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </form>
  );
}
