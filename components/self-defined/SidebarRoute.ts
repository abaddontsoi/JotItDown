import { FilePen, Home } from "lucide-react";

const navRoutes = [
    {
        label: 'Notes',
        route: '/home/notes',
    },
    {
        label: 'Tasks',
        route: '/home/tasks',
    },
    // {
    //     label: 'Note Categories',
    //     route: '/home/categories',
    // },
    // {
    //     label: 'Content Blocks',
    //     route: '/home/content-blocks',
    // },
    {
        label: 'Groups',
        route: '/home/groups',
    },
    {
        label: 'Budget',
        route: '/home/budget',
    },
    {
        label: 'Inbox',
        route: '/home/inbox',
    }
];

const routes = [
    {
        group: 'Notes',
        children: [
            {
                label: 'Notes',
                route: '/home/notes',
                icon: Home,
            },
            {
                label: 'Tasks',
                route: '/home/tasks',
                icon: FilePen,
            },
        ]
    },
    {
        group: 'Groups',
        children: [
            {
                label: 'Groups',
                route: '/home/groups',
                icon: Home,
            },
            {
                label: 'Inbox',
                route: '/home/inbox',
                icon: Home,
            },
        ]
    },
    {
        group: 'Wealth',
        children: [
            {
                label: 'Budget',
                route: '/home/budget',
                icon: Home,
            },
        ]
    },
];

export {
    navRoutes,
    routes
}