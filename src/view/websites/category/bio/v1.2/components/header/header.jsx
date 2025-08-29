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
                        fontWeight: getTypeSystem('headline', 'h4', 'weight'),
                        lineHeight: getTypeSystem('headline', 'h4', 'line_height'),
                        letterSpacing: getTypeSystem('headline', 'h4', 'letter_spacing')
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
                        fontSize: getTypeSystem('headline', 'h5', 'size'),
                        fontWeight: getTypeSystem('headline', 'h5', 'weight'),
                        lineHeight: getTypeSystem('headline', 'h5', 'line_height'),
                        letterSpacing: getTypeSystem('headline', 'h5', 'letter_spacing')
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
