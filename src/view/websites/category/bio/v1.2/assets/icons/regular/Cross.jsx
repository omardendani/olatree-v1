export function Cross({ size = 24, color = '#000000', strokeWidth = 24 }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            width={size}
            height={size}
            fill="none"
        >
            <rect width="256" height="256" fill="none" />
            <line
                x1="200"
                y1="56"
                x2="56"
                y2="200"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
            />
            <line
                x1="200"
                y1="200"
                x2="56"
                y2="56"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
            />
        </svg>
    );
}