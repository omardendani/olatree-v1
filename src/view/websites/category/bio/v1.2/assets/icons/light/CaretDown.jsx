export function CaretDown({ size = 24, color = '#000000', strokeWidth = 12 }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            width={size}
            height={size}
            fill="none"
        >
            <rect width="256" height="256" fill="none" />
            <polyline
                points="208 96 128 176 48 96"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
            />
        </svg>
    );
}