import { useEffect } from "react";


export default function BaserageLoader({ templateName, children }) {
    useEffect(() => {
        // Charger le style uniquement lorsque ce composant est monté
        const linkId = "template-stylesheet";
        const existingLink = document.getElementById(linkId);

        // Supprime les anciens styles
        if (existingLink) {
            existingLink.parentNode.removeChild(existingLink);
        }

        // Crée un nouveau lien pour le style du template
        const link = document.createElement("link");
        link.id = linkId;
        link.rel = "stylesheet";
        link.href = `/src/view/Baserage/${templateName}/styles/style.css`;
        document.head.appendChild(link);

        // Nettoyage lorsque le composant est démonté
        return () => {
            const cleanupLink = document.getElementById(linkId);
            if (cleanupLink) {
                cleanupLink.parentNode.removeChild(cleanupLink);
            }
        };
    }, [templateName]);

    return <>{children}</>;
}
