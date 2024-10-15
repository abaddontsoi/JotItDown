import { ToastError, ToastLoading } from "@/components/self-defined/toast-object";
import { DetailedGroup } from "@/components/self-defined/types";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const groupFormSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
})


export const getForm = (existingGroup?: DetailedGroup) => useForm<z.infer<typeof groupFormSchema>>({
    resolver: zodResolver(groupFormSchema),
    defaultValues: {
        name: existingGroup?.name, 
        description: existingGroup?.description || undefined,
    }
});
