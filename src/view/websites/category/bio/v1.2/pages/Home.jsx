import { useRef, } from "react";
import { Header } from "../components/header/header.jsx";
import { Edit_Mode_Bento, Viewer_Mode_Bento } from './Sections/Bento.jsx';
import { usePageData } from "../../../../../../contexts/PageDataContext.jsx";
import useLayoutMargin from "../utils/useLayoutMargin.jsx";


export default function Home({ authData}) {
  const edit_Mode = authData?.isAuthenticated ?? false;  // simple assign  

  const containerRef = useRef(null);
  
  // Page data :
    const data = usePageData();   // Data door ...

    // Page Layout :
    console.log()
      const { getMargins } = useLayoutMargin();
      const [vertical, horizontal] = getMargins();

    // Page Data :
      const profile_pic = data.pic;
      const style_pic = data.systemDesign.pic.style;
      const bio_b1 = data.bio.b1;
      const bio_b2 = data.bio.b2;

  return (
    <div 
      className="home-container"
      style={{
        '--layout-bord-margin': horizontal,
        '--layout-top-margin': vertical,
        paddingLeft: 'var(--layout-bord-margin)',
        paddingRight: 'var(--layout-bord-margin)',
        paddingTop: 'var(--layout-top-margin)',
      }}
    >

      <div className="layout-container" ref={containerRef}>

        <Header
          editMode={edit_Mode}
          content={{
            pic: profile_pic,
            picStyle: style_pic,
            b1: bio_b1,
            b2: bio_b2
          }}
          style={{
            //cellWidth,
            '--layout-bord-margin': horizontal,
            '--layout-top-margin': vertical,
          }}
        />

        {/* -- Benot Section   `${cellWidth}px`  -- */}
        {edit_Mode ? <Edit_Mode_Bento /> : <Viewer_Mode_Bento />}

      </div>

      <footer className="footer">Powered By Olatree</footer>

    </div>
  );
}