export function SortThreeLines({ size = 513.5, color = '#000000', strokeWidth = 40 }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 513.5 256"
            height={size} // Conserve les proportions
            width={(size * 513.5) / 256}
            fill="none"
        >
            <rect width="513.5" height="256" fill="none" />
            <line
                x1="128"
                y1="52"
                x2="128"
                y2="204"
                stroke={color}
                strokeLinecap=""
                strokeLinejoin=""
                strokeWidth={strokeWidth}
            />
            <line
                x1="256.8"
                y1="52"
                x2="256.8"
                y2="204"
                stroke={color}
                strokeLinecap=""
                strokeLinejoin=""
                strokeWidth={strokeWidth}
            />
            <line
                x1="385.5"
                y1="52"
                x2="385.5"
                y2="204"
                stroke={color}
                strokeLinecap=""
                strokeLinejoin=""
                strokeWidth={strokeWidth}
            />
        </svg>
    );
}