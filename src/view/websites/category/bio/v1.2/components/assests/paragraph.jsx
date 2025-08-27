import React from 'react';

export default function Paragraph({ content }) {
    if(content != null){
        const textContent = Array.isArray(content) ? content.join('\n') : String(content);
        return (
                textContent.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        <br />
                    </React.Fragment>
                ))
        );
    }
}