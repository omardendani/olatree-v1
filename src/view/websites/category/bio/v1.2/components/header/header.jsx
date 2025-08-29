import { design_system } from "../../pages/Sections/config/bentoConfig.jsx";
import Paragraph from "../assests/paragraph.jsx";

export function Header({ content, editMode, style }) {
    const {pic, picStyle, b1, b2} = content;
    const edit_Mode = editMode;

    const type_system_design = design_system.typography;

    const getTypeSystem = (tp_category, tp_var, tp_get) => {
        return type_system_design[tp_category][tp_var][tp_get];
    };

    return (
        <div 
            className="header-body" 
            style={ 
                style
            }>
            
            <div 
                className="header-picture"
                style={picStyle}
            >
                {/* Picture */}
                <div className="dv-picture">
                    <img src={pic} alt="Profile Picture" />
                </div>
                {/* Picture */}
            </div>

            <div className="header-txt">
                
                <p 
                    className="header-h1"
                    style={{
                        fontSize: getTypeSystem('headline', 'h4', 'size'),
                        fontWeight: "400",
                        lineHeight: "1.2",
                        letterSpacing: "-0.9"
                    }}
                    contentEditable={false}
                    spellCheck={false}
                    >

                    {<Paragraph content={b1} />}
                    
                </p>

            </div>
            <div className="header-small-txt">
                <p 
                    className="header-h2"
                    style={{
                        fontSize: "18",
                        fontWeight: "300",
                        lineHeight: "1.5",
                        letterSpacing: "0"
                    }}
                    contentEditable={edit_Mode}
                    spellCheck={false}
                >
                    {<Paragraph content={b2}/>}
                    
                </p>
            </div>
        </div>
    );
    
}
