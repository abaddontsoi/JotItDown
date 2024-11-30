import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatisticsCardProps {
    id: string;
    title: string;
    content: string;
    subContent?: string;
}

export function StatisticsCard({ id, title, content, subContent }: StatisticsCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'grab',
    };

    return (
        <Card ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <CardHeader>
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{content}</div>
                {subContent && (
                    <div className="text-sm text-muted-foreground">
                        {subContent}
                    </div>
                )}
            </CardContent>
        </Card>
    );
} 