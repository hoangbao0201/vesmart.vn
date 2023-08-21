type ClassType = {
    className: string;
};

export const IconGoogle = ({ className }: ClassType) => {
    return (
        <svg viewBox="0 0 100 100" className={className}>
            <linearGradient
                id="b"
                x1="55.41"
                x2="12.11"
                y1="96.87"
                y2="21.87"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0" stopColor="#1e8e3e" />
                <stop offset="1" stopColor="#34a853" />
            </linearGradient>
            <linearGradient
                id="c"
                x1="42.7"
                x2="86"
                y1="100"
                y2="25.13"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0" stopColor="#fcc934" />
                <stop offset="1" stopColor="#fbbc04" />
            </linearGradient>
            <linearGradient
                id="a"
                x1="6.7"
                x2="93.29"
                y1="31.25"
                y2="31.25"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0" stopColor="#d93025" />
                <stop offset="1" stopColor="#ea4335" />
            </linearGradient>
            <path fill="url(#a)" d="M93.29 25a50 50 90 0 0-86.6 0l3 54z" />
            <path
                fill="url(#b)"
                d="M28.35 62.5 6.7 25A50 50 90 0 0 50 100l49-50z"
            />
            <path
                fill="url(#c)"
                d="M71.65 62.5 50 100a50 50 90 0 0 43.29-75H50z"
            />
            <path fill="#fff" d="M50 75a25 25 90 1 0 0-50 25 25 90 0 0 0 50z" />
            <path
                fill="#1a73e8"
                d="M50 69.8a19.8 19.8 90 1 0 0-39.6 19.8 19.8 90 0 0 0 39.6z"
            />{" "}
        </svg>
    );
};

export const IconDashboard = ({ className }: ClassType) => {
    {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={className}
            >
                <rect width="7" height="9" x="3" y="3" rx="1" />
                <rect width="7" height="5" x="14" y="3" rx="1" />
                <rect width="7" height="9" x="14" y="12" rx="1" />
                <rect width="7" height="5" x="3" y="16" rx="1" />
            </svg>
        );
    }
};

export const IconLogout = ({ className }: ClassType) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
        </svg>
    );
};

export const IconArrowTop = ({ className }: ClassType) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m5 12 7-7 7 7" />
            <path d="M12 19V5" />
        </svg>
    );
};

export const IconArrowLeft = ({ className }: ClassType) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m15 18-6-6 6-6" />
        </svg>
    );
};

export const IconArrowRight = ({ className }: ClassType) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
};

export const IconHeart = ({ className }: ClassType) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    );
};

export const IconStar = ({ className }: ClassType) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
};

export const IconShoppingCart = ({ className }: ClassType) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
    );
};

export const IconShoppingBag = ({ className }: ClassType) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
    );
};

export const IconMinus = ({ className }: ClassType) => {
    return (
        <svg
            enableBackground="new 0 0 10 10"
            viewBox="0 0 10 10"
            x="0"
            y="0"
            className={className}
        >
            <polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></polygon>
        </svg>
    );
};

export const IconPlus = ({ className }: ClassType) => {
    return (
        <svg
            enableBackground="new 0 0 10 10"
            viewBox="0 0 10 10"
            x="0"
            y="0"
            className={className}
        >
            <polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon>
        </svg>
    );
};

export const IconChevronsRight = ({ className }: ClassType) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m6 17 5-5-5-5" />
            <path d="m13 17 5-5-5-5" />
        </svg>
    );
};

export const Icon = ({ className }: ClassType) => {
    return <></>;
};
