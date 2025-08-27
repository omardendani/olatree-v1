import { createContext, useContext } from "react";

const PageDataContext = createContext(null);

export const usePageData = () => useContext(PageDataContext);

export const PageDataProvider = ({ data, children }) => {
    return (
        <PageDataContext.Provider value={data}>
            {children}
        </PageDataContext.Provider>
    );
};
