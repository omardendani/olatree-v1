export function ArrowRight({ size = 24, color = '#000000', strokeWidth = 12 }) {
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
                x1="40"
                y1="128"
                x2="216"
                y2="128"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
            />
            <polyline
                points="144 56 216 128 144 200"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
            />
        </svg>
    );
}