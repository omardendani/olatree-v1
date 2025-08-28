import { lazy, Suspense, useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import WebsiteLoader from "../utils/WebsiteLoader.jsx";
import Dashboard from "../layouts/Baserage/dashboard/Dashboard.jsx";
import pageData from "../data/pages.json";
import { useAuthUser } from "../hooks/useAuthUser.js";
import { PageDataProvider } from "../contexts/PageDataContext.jsx";

// --- Import dynamique sécurisé ---
const modules = import.meta.glob('../view/websites/category/**/*.jsx');

// Cache pour éviter de recréer les composants lazy
const componentCache = new Map();

const loadComponent = (templateName, indexPath, version) => {
  // Cherche la clé correspondant au fichier voulu
  const matchedPath = Object.keys(modules).find(key =>
    key.includes(`/${templateName}/${version}/${indexPath}.jsx`)
  );

  if (!matchedPath) {
    console.error(`ERR. Component not found: ${templateName}/${version}/${indexPath}.jsx`);
    console.log('Available modules:', Object.keys(modules));
    return null;
  }

  if (componentCache.has(matchedPath)) {
    return componentCache.get(matchedPath);
  }

  const LazyComponent = lazy(() => modules[matchedPath]());
  componentCache.set(matchedPath, LazyComponent);
  return LazyComponent;
};

export function DynamicWebsite___Route() {
  const { profilename } = useParams();
  const [Component, setComponent] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const user = useAuthUser();

  useEffect(() => {
    const info = pageData[profilename];
    if (!info) {
      setPageInfo(null);
      return;
    }

    const Comp = loadComponent(info.pageCategory, info.indexPath);
    setComponent(() => Comp);
    setPageInfo(info);
  }, [profilename]);

  // Gestion du title, favicon et typography
  useEffect(() => {
    if (!pageInfo?.data) return;

    if (pageInfo.data.title) document.title = pageInfo.data.title;

    if (pageInfo.data.pic) {
      let favicon = document.querySelector("link[rel='icon']");
      if (!favicon) {
        favicon = document.createElement("link");
        favicon.rel = "icon";
        document.head.appendChild(favicon);
      }
      favicon.href = pageInfo.data.pic;
    }

    const fontFamily = pageInfo.data.systemDesign?.typography?.family || "Inter";
    if (!document.querySelector(`link[data-font='${fontFamily}']`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
        " ",
        "+"
      )}:wght@400;500;600;700&display=swap`;
      link.setAttribute("data-font", fontFamily);
      document.head.appendChild(link);
    }

    document.body.style.fontFamily = `"${fontFamily}", sans-serif`;
    document.body.style.setProperty("--font-family", `"${fontFamily}", sans-serif`);
  }, [pageInfo]);

  // page non trouvée
  //if (!pageInfo) return <Navigate to="/login" />; 
  if (!pageInfo) return ("Page Non existe ...")

  const data = pageInfo.data;

  return (
    <WebsiteLoader version={pageInfo.version} pageCategory={pageInfo.pageCategory}>
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


export default function DynamicWebsiteRoute() {
  const { profilename } = useParams();
  const [Component, setComponent] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);

  const user = useAuthUser();

  useEffect(() => {

    const info = pageData[profilename];

    if (!info) {
      setPageInfo(null);
      return;
    }

    const Comp = loadComponent(
      info.pageCategory,
      info.indexPath,
      info.version,
    );

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
  if (!pageInfo) return "error";

  const data = pageInfo.data;
  console.log(data)

  return (
    <WebsiteLoader
      version={pageInfo.version}
      pageCategory={pageInfo.pageCategory}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <PageDataProvider data={data}>
          {Component ? (
            pageInfo.authRequired && user ? (
              <Dashboard>
                <Component authData={{ isAuthenticated: true }} />
              </Dashboard>
            ) : (
              <Component />
            )
          ) : (
            <div>Component not found</div>
          )}
        </PageDataProvider>
      </Suspense>
    </WebsiteLoader>
  );
}

