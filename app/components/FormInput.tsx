'use client';

export default function FormInput({ label, name, type, errors ,defaultValue}: {
    label: string;
    name: string;
    type: string;
    errors: string[] | undefined;
    defaultValue?: string;
}) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
            <input type={type} id={name} name={name} required defaultValue={defaultValue}
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            />
            {errors && (
                <p className="text-red-500 text-xs mt-1">{errors.join(', ')}</p>
            )}
        </div>
    );
}