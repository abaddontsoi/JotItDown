'use client';

import { NotebookPen } from "lucide-react";
import { Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarFooter, SidebarTrigger, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroupContent } from "../ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "./SidebarRoute";
import { cn } from "@/lib/utils";

export default function SidebarComponent() {
    const router = useRouter();
    const path = usePathname();
    return (
        <Sidebar collapsible={'icon'}>
            <SidebarHeader>
                <SidebarMenuButton
                    onClick={() => {
                        router.push('/home');
                    }}
                >
                    <NotebookPen />
                    JotItDown
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent>
                {
                    routes.map(r => (
                        <SidebarGroup key={r.group}>
                            <SidebarGroupLabel>{r.group}</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {
                                        r.children && r.children.map(
                                            c => (
                                                <SidebarMenuItem key={c.label}>
                                                    <SidebarMenuButton
                                                        onClick={() => {
                                                            router.push(c.route);
                                                        }}
                                                        className={
                                                            cn(
                                                                path == c.route && "underline",
                                                                "px-5",
                                                            )
                                                        }
                                                        variant={path == c.route ? 'outline' : 'default'}
                                                    >
                                                        {
                                                            c.icon &&
                                                            <c.icon />
                                                        }
                                                        <span
                                                            className={
                                                                cn(
                                                                    "flex items-center gap-2",
                                                                    "transition hover:scale-110 hover:translate-x-2 duration-500",
                                                                )
                                                            }
                                                        >
                                                            {c.label}
                                                        </span>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            )
                                        )
                                    }
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    ))
                }
            </SidebarContent>
            <SidebarFooter>
                <SidebarTrigger />
            </SidebarFooter>
        </Sidebar>
    )
}