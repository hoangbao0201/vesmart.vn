import { IconProps } from "@/lib/types";

const IconEcovacs: React.FC<IconProps> = ({
    size = "20",
    color = "currentColor",
    ...attributes
}) => {
    return (
        <>
            <svg
                width={size}
                height={size}
                {...attributes}
                viewBox="0 0 192 192"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                    <defs></defs>
                    <path d="M0 0h192v192H0z" style={{ fill: "none" }}></path>
                    <path
                        id="path2"
                        d="M43.32 43.36c36.03-28.48 71.15-28.48 105.36 0m0 105.28c-36.03 28.48-71.15 28.48-105.36 0m48.22-53.41h22.23"
                        style={{
                            stroke: "#000000",
                            strokeLinecap: "round",
                            strokeWidth: "12px",
                            fill: "none",
                        }}
                    ></path>
                    <path
                        id="path3216"
                        d="m87.31 68.49-.79.05c-7.79 1.02-14.02 5.05-17.8 10.38s-5.27 11.73-4.97 17.95 2.38 12.35 6.41 17.27a24.009 24.009 0 0 0 17.63 8.75h29.53v-11.95H88.27c-3.96-.16-6.61-1.73-8.76-4.35-2.15-2.62-3.54-6.42-3.72-10.3-.19-3.88.82-7.71 2.8-10.51 1.95-2.75 4.69-4.69 9.28-5.35h29.75V68.48H87.31Z"
                    ></path>
                    <path
                        id="path3204"
                        d="m117.62 80.44-6.85-11.95h13.69l-6.85 11.95Z"
                    ></path>
                    <path
                        id="path3204-8"
                        d="m117.32 110.95 6.84 11.95h-13.69l6.84-11.95Z"
                    ></path>
                </g>
            </svg>
        </>
    );
};

export default IconEcovacs;
