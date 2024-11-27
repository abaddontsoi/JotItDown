'use client';

import { DetailedTaskInfo } from "@/components/self-defined/types";
import { TaskInfoStatus } from "@prisma/client";

interface TaskInfoPageProp {
    task: DetailedTaskInfo | null;
}

export default function TaskInfoPage({
    task
}: TaskInfoPageProp) {
    if (task == null) {
        return (
            <div className="flex items-center justify-center h-screen text-lg text-gray-500">
                Task cannot be found
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            {/* Location and title */}
            <div className="text-sm text-gray-600 flex items-center space-x-2">
                <span>{task.parentContentBlock?.parentNote?.title}</span>
                <span>\</span>
                <span>{task.parentContentBlock?.title}</span>
                <span>\</span>
                <span className="font-medium text-gray-900 text-2xl">{task.title}</span>
            </div>

            {/* Deadline */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-sm font-semibold text-gray-700">Deadline</h2>
                <p className="mt-1 text-gray-600">{task.deadline.toDateString()}</p>
            </div>

            {/* Description */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-sm font-semibold text-gray-700">Task Description</h2>
                <p className="mt-1 text-gray-600 whitespace-pre-wrap">{task.description}</p>
            </div>

            {/* Status */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-sm font-semibold text-gray-700">Status</h2>
                <span className={`
                    mt-1 inline-block px-3 py-1 rounded-full text-sm
                    ${task.status === TaskInfoStatus.Draft ? 'bg-blue-100 text-blue-800' : ''}
                    ${task.status === TaskInfoStatus.Pending ? 'bg-blue-100 text-blue-800' : ''}
                    ${task.status === TaskInfoStatus.Running ? 'bg-blue-100 text-blue-800' : ''}
                    ${task.status === TaskInfoStatus.Done ? 'bg-blue-100 text-blue-800' : ''}
                `}>
                    {task.status}
                </span>
            </div>

            {/* Belong to group or user */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-sm font-semibold text-gray-700">Belong To</h2>
                <p className="mt-1 text-gray-600">
                    {task.group?.name || task.belongTo?.name}
                </p>
            </div>
        </div>
    );
}