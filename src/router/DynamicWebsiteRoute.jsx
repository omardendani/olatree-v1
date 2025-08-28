import { lazy, Suspense, useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import WebsiteLoader from "../utils/WebsiteLoader.jsx";
import Dashboard from "../layouts/Baserage/dashboard/Dashboard.jsx";
import pageData from "../data/pages.json";
import { useAuthUser } from "../hooks/useAuthUser.js"; // facultatif
import { PageDataProvider } from "../contexts/PageDataContext.jsx";

// Fonction pour importer dynamiquement un composant
const loadTemplateComponent = (pageCategory, version, indexPath) =>
    lazy(() =>
        import(
            `../view/websites/category/${pageCategory}/${version}/${indexPath}.jsx`
        ).then((module) => ({ default: module.default }))
    );

export default function DynamicWebsiteRoute() {
    const { profilename } = useParams();
    const [Component, setComponent] = useState(null);
    const [pageInfo, setPageInfo] = useState(null);

    const user = useAuthUser();

    useEffect(() => {
        //console.log("profilename:", profilename);
        //console.log("pageData keys:", Object.keys(pageData));

        const info = pageData[profilename];

        if (!info) {
            setPageInfo(null);
            return;
        }

        const Comp = loadTemplateComponent(
            info.pageCategory,
            info.version,
            info.indexPath
        );

        setComponent(() => Comp);
        setPageInfo(info);
    }, [profilename]);

    // Title & Favicon & Typo:
    /*useEffect(() => {
        if (pageInfo?.data) {
            // Changer le title
            if (pageInfo.data.title) {
                document.title = pageInfo.data.title;
            }

            // Favicon = profileImage
            if (pageInfo.data.pic) {
                let favicon = document.querySelector("link[rel='icon']");
                if (!favicon) {
                    favicon = document.createElement("link");
                    favicon.rel = "icon";
                    document.head.appendChild(favicon);
                }
                favicon.href = pageInfo.data.pic;
            }

            // Typography
            // Tu fait la un l'ajoute de font par defauts de google font
            // Tu fait le font Inter, et apres en met la functionaliter de dynamique font import

        }
    }, [pageInfo]);*/

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
        const fontFamily = pageInfo.data.systemDesign.typography.family || defaultFont;

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

    //if (!pageInfo) return <Navigate to="/" />;
    console.log(data);
    if (!pageInfo) return "error haha";

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
