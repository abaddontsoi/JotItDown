import { ArrowRightLeft, ChartLine, DollarSign, FilePen, Home, Inbox, NotebookText, UsersRound } from "lucide-react";

const navRoutes = [
    {
        label: 'Notes',
        route: '/home/notes',
    },
    {
        label: 'Tasks',
        route: '/home/tasks',
    },
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
                icon: NotebookText,
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
                icon: UsersRound,
            },
            {
                label: 'Inbox',
                route: '/home/inbox',
                icon: Inbox,
            },
        ]
    },
    {
        group: 'Wealth',
        children: [
            {
                label: 'Budget',
                route: '/home/budget',
                icon: DollarSign,
            },
            {
                label: 'Transactions',
                route: '/home/transactions',
                icon: ArrowRightLeft,
            },
            {
                label: 'Statistics',
                route: '/home/statistics',
                icon: ChartLine,
            },
        ]
    },
];

export {
    navRoutes,
    routes
}