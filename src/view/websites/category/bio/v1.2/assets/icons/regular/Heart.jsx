
export function Heart({ size = 24, color = '#000000', strokeWidth = 16, fill = 'none' }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width={size} height={size} fill="none">
            <rect width="256" height="256" fill="none"/>
            <path 
                d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,168,128,224,128,224Z" 
                fill={fill} 
                stroke={color} 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={strokeWidth} 
            />
        </svg>
    );
}