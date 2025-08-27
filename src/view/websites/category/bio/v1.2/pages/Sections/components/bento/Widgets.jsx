import { design_system } from "../../config/bentoConfig.jsx";

export function Widget_Text({ data }) {
    
    const text = 'The default text';
    const caption = 'The default caption text';
    const button = null;

    return (
        <div 
            className={`bento-item-cnt ${css_class}`}
            style={css_var}
        >
            <p style={style.text}>
                <Paragraph content={content}/>
            </p>

            <p style={{
                position: 'absolute',
                bottom: 'var(--padding)',
                css_var,
                fontSize:'12px',
                color: '#666666',

            }}>Caption small text</p>

            <button type="button"
                style={{
                    position: 'absolute',
                    bottom: 'var(--padding)',
                    right: 'var(--padding)',
                    css_var,
                    height: '25px',
                    aspectRatio: 1,
                    backgroundColor: 'rgb(234 234 234)',
                    borderRadius: "25px"

            }}> </button>

        </div>
    );

}

export function Widget_name({ data }) {

    return(
        
        null 

    )
}


export function Widget_Stat({data}) {

    const widgetSystem = design_system.widget;

    const with_cont = widgetSystem.container.with;

    const background = '#f5f5f5'

    return (
        <div 
            className={"bento-item-cnt"}
            style={{
                with_cont,
                '--bg': {background},
            }}
        >
            
            <p
                style={style.title}
            >
                {content.title}
            </p>

            <p
                style={style.value}
            >
                {content.value}
            </p>

        </div>
    );
    
}