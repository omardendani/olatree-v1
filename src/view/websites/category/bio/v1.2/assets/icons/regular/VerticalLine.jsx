export function VerticalLine({ size = 24, color = '#000000', strokeWidth = 20 }) {
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
                x1="128"
                y1="24"
                x2="128"
                y2="232"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
            />
        </svg>
    );
}