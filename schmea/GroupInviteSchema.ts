import { ToastError, ToastLoading } from "@/components/self-defined/toast-object";
import { DetailedGroup } from "@/components/self-defined/types";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { InvitationType, User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const groupInvitationFormSchema = z.object({
    id: z.string(),
    // fromId: z.string(),
    // toId: z.string(),
    toEmail: z.string().email(),
    // type: z.enum(Object.values(InvitationType) as [string, ...string[]]),
})

export const getForm = (existingGroup: DetailedGroup) => useForm<z.infer<typeof groupInvitationFormSchema>>({
    resolver: zodResolver(groupInvitationFormSchema),
    defaultValues: {
        id: existingGroup.id,
    }
});
