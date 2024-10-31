'use client';

import { NotebookPen } from "lucide-react";
import { Button } from "../ui/button";
import { Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarFooter, SidebarTrigger, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroupContent } from "../ui/sidebar";
import { useRouter } from "next/navigation";
import { routes } from "./SidebarRoute";

export default function SidebarComponent() {
    const router = useRouter();
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenuButton
                    variant={'outline'}
                    onClick={() => {
                        router.push('/home');
                    }}
                    // className="flex flex-row items-center m-[30px] text-2xl"
                >
                    <NotebookPen className="w-10 h-10" />
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
                                                    // asChild
                                                    >
                                                        {
                                                            c.icon &&
                                                            <c.icon />
                                                        }
                                                        {c.label}
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
            <SidebarFooter />
        </Sidebar>
    )
}