import { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WebsiteLoader from "../utils/WebsiteLoader.jsx";
import Dashboard from "../layouts/Baserage/dashboard/Dashboard.jsx";
import pageData from "../data/pages.json";
import { useAuthUser } from "../hooks/useAuthUser.js";
import { PageDataProvider } from "../contexts/PageDataContext.jsx";

// Import.meta.glob pour charger tous les composants website de façon statique
const websiteModules = import.meta.glob('../view/websites/category/**/*.jsx');

// Fonction pour charger un composant website
const loadWebsiteComponent = (pageCategory, version, indexPath) => {
    const path = `../view/websites/category/${pageCategory}/${version}/${indexPath}.jsx`;
    
    if (!websiteModules[path]) {
        console.error(`Website component not found: ${path}`);
        console.log('Available website modules:', Object.keys(websiteModules));
        return null;
    }
    
    // Utiliser lazy import avec le module trouvé
    return lazy(() => websiteModules[path]().then(module => ({
        default: module.default
    })));
};

export default function DynamicWebsiteRoute() {
    const { profilename } = useParams();
    const [Component, setComponent] = useState(null);
    const [pageInfo, setPageInfo] = useState(null);

    const user = useAuthUser();

    useEffect(() => {
        const info = pageData[profilename];

        if (!info) {
            setPageInfo(null);
            setComponent(null);
            return;
        }

        // Charger le composant avec import.meta.glob
        const Comp = loadWebsiteComponent(
            info.pageCategory,
            info.version,
            info.indexPath
        );

        if (!Comp) {
            console.error(`Failed to load component for profile: ${profilename}`);
            setComponent(null);
            return;
        }

        setComponent(() => Comp);
        setPageInfo(info);
    }, [profilename]);

    useEffect(() => {
        if (!pageInfo?.data) return;

        // --- TITLE ---
        if (pageInfo.data.title) {
            document.title = pageInfo.data.title;
        }

        // --- FAVICON ---
        if (pageInfo.data.pic) {
            let favicon = document.querySelector("link[rel='icon']");
            if (!favicon) {
                favicon = document.createElement("link");
                favicon.rel = "icon";
                document.head.appendChild(favicon);
            }
            favicon.href = pageInfo.data.pic;
        }

        // --- TYPOGRAPHY ---
        const defaultFont = "Inter";
        const fontFamily = pageInfo.data.systemDesign?.typography?.family || defaultFont;

        // Vérifie si la font est déjà ajoutée
        const existingLink = document.querySelector(`link[data-font='${fontFamily}']`);
        if (!existingLink) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
                " ",
                "+"
            )}:wght@400;500;600;700&display=swap`;
            link.setAttribute("data-font", fontFamily);
            document.head.appendChild(link);
        }

        // Appliquer la font à tout le document
        document.body.style.fontFamily = `"${fontFamily}", sans-serif`;
        document.body.style.setProperty("--font-family", `"${fontFamily}", sans-serif`);
    }, [pageInfo]);

    if (!pageInfo) {
        return <div>Profile not found</div>;
    }

    if (!Component) {
        return <div>Component could not be loaded</div>;
    }

    const data = pageInfo.data;

    return (
        <WebsiteLoader
            version={pageInfo.version}
            pageCategory={pageInfo.pageCategory}
        >
            <Suspense fallback={<div>Loading...</div>}>
                <PageDataProvider data={data}>
                    {pageInfo.authRequired && user ? (
                        <Dashboard>
                            <Component authData={{ isAuthenticated: true }} />
                        </Dashboard>
                    ) : (
                        <Component />
                    )}
                </PageDataProvider>
            </Suspense>
        </WebsiteLoader>
    );
}