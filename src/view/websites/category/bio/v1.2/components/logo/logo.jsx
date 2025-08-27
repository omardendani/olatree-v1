import Paragraph from "../assests/paragraph.jsx";

export function Logo({ icon, childrenClass= 'btns-st1-ic' }) {
  return (
        <div className="logo-type-1">
            <span className="logo-prefix">Dr.</span>
            <div className="logo-name"><Paragraph content={"Khawla\nDendani"}/></div>
        </div>
  );
}
