import { useEffect, useState } from "react";

export default function WebsiteLoader({ pageCategory, version, children }) {
    const [profileExists, setProfileExists] = useState(null); // État pour vérifier la disponibilité du profil

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
        link.href = `/src/view/websites/category/${pageCategory}/${version}/styles/style.css`;
        document.head.appendChild(link);

        // Nettoyage lorsque le composant est démonté
        return () => {
            const cleanupLink = document.getElementById(linkId);
            if (cleanupLink) {
                cleanupLink.parentNode.removeChild(cleanupLink);
            }
        };
    }, [pageCategory]);

    useEffect(() => {
        // Vérification de la disponibilité du profil
        const checkProfileAvailability = async () => {
            try {
                const response = await fetch(`/api/profile/${pageCategory}`);
                if (response.ok) {
                    setProfileExists(true); // Le profil existe
                } else {
                    setProfileExists(false); // Le profil n'existe pas
                }
            } catch (error) {
                console.error("Erreur lors de la vérification du profil :", error);
                setProfileExists(false); // Considérer comme indisponible en cas d'erreur
            }
        };

        checkProfileAvailability();
    }, [pageCategory]);

    // Affichage pendant la vérification
    if (profileExists === null) {
        return <div>Loading...</div>;
    }

    // Affichage en cas de profil indisponible
    if (!profileExists) {
        return <div>Profile not found</div>; // Vous pouvez remplacer par une redirection ou un autre composant
    }

    // Affichage du contenu si le profil est disponible
    return <>{children}</>;
}
