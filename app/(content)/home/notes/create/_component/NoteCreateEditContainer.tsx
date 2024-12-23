'use client';

import NoteForm from "@/components/self-defined/NoteForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function NoteCreateEditContainer() {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    }

    return (
        <div className="space-y-6">

            <Card>
                <CardHeader>
                    <CardTitle>Note Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <NoteForm
                        mode={'Create'}
                        onCancel={handleBack}
                    />
                </CardContent>
            </Card>
        </div>
    );
}