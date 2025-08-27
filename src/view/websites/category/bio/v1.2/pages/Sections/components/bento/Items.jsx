import { Link } from 'react-router-dom';

import { design_system, WIDGET_TEMPLATE } from "../../config/bentoConfig.jsx";
import { useDeviceType, normalizeDeviceType } from '../../hooks/useDeviceType.jsx';

import WhatsAppAction from '../../../../components/actions/Actions.jsx';
import { getSiteInfo } from '../../../../utils/getSiteInfo.jsx';


export function Items({ data }) {

    const item_data = data.content;
    const type = item_data.type;
    const style = item_data.style;

    const template = WIDGET_TEMPLATE[type].content;
    const templateType = template.type;

    const defaultContent = template.content;

    // Styling:
    const templateStyle = template.style;
    const container = templateStyle.container;

    const defaultVar = template.var || null;
    const customVar = item_data.var || null;

    console.log(templateType)

    const deviceType = normalizeDeviceType(useDeviceType()); // 'MOBILE' ou 'DESKTOP'


    const key = deviceType.toLowerCase();
    const { h, w } = data.style[key];

    const widget = design_system.widget.default;


    if (type === 'stat') {

        const content = item_data.content;

        return (
            <div
                className={`bento-item-cnt`}

                style={{
                    ...container,
                    ...customVar.container || defaultVar.container
                }}
            >

                <p
                    contentEditable={false}
                    spellCheck={false}

                    style={{
                        ...templateStyle.title,
                        ...customVar.title || defaultVar.title
                    }}
                >
                    {content.title || defaultContent.title}
                </p>

                <p
                    contentEditable={false}
                    spellCheck={false}
                    
                    style={{
                        ...templateStyle.value,
                        ...customVar.value || defaultVar.value
                    }}
                >
                    {content.value || defaultContent.value}
                </p>

            </div>
        );

    }

    if (type === 'cta') {

        const content = item_data.content;

        if( true ){
        return (
            <div
                className={`bento-item-cnt`}
                style={{
                    ...container,
                    ...customVar.container || defaultVar.container
                }}
            >
                <p
                    contentEditable={false}
                    spellCheck={false}
                    style={{
                        ...templateStyle.value,
                        ...customVar.value || defaultVar.value
                    }}
                >
                    {content.value}
                </p>

                <div
                    style={null}
                >
                        
                    <WhatsAppAction
                        phone={'212767574663'}
                        message={`
                            Hello, Can i Get a quote?
                        `}
                        button= {
                            <p
                                style={{
                                    ...templateStyle.btn.content.text,
                                    ...customVar.btn.content.text || defaultVar.btn.content.text
                                }}
                            >
                                {content.btn.value.text}
                            </p>
                        }
                    />

                </div>

            </div>
        );
        }
    }

    if (type === 'rich_text') {

        const content = item_data.content;

        return (
            <div
                className={`bento-item-cnt`}
                style={{
                    ...container,
                    ...customVar.container || defaultVar.container
                }}
            >
                <p
                    contentEditable={false}
                    spellCheck={false}
                    style={{
                        ...templateStyle.text,
                        ...customVar.text || defaultVar.text

                    }}
                >
                    {content.value}
                </p>

            </div>
        );

    }


    if (type === 'title') {

        const content = item_data.content;

        return (
            <div
                className={`bento-item-cnt`}
                style={{
                    ...container,
                    ...customVar.container || defaultVar.container
                }}
            >
                <p
                    contentEditable={false}
                    spellCheck={false}
                    style={{
                        ...templateStyle.title,
                        ...customVar.title || defaultVar.title

                    }}
                >
                    {content.title}
                </p>

            </div>
        );

    }

    if (type === 'link') {

        const content = item_data.content;

        // Contents
        const url = content.url;

        const customTitle = content.title;
        const subTitle = content.subTitle;

        const favicon = getSiteInfo(url).favicon;
        const siteName = getSiteInfo(url).siteName;
        const title = getSiteInfo(url).title;

        // Shape : 1:1      ( Just Icon )
        if (h == 1 && w == 1) {
            return (
                <Link
                    to={url}
                    target="_blank"
                >
                    <div
                        className={`bento-item-cnt`}
                        style={null}
                    >
                        <span className="bento-item-span-icon">
                            <img src={null} />
                        </span>
                    </div>
                </Link>
            );
        }

        // Shape : 2:2      ( Icon & Texts )
        if (h >= 2 && w >= 2) {
            return (
                <Link
                    to={url}
                    target="_blank"
                >
                    <div
                        className={`bento-item-cnt`}
                        style={{
                            ...container,
                            ...customVar.container || defaultVar.container
                        }}
                    >

                        <span
                            style={{
                                ...templateStyle.span
                            }}
                        >
                            <img 
                                src={favicon}
                                style={{
                                    objectFit: "cover",
                                    width: "100%",
                                }}
                            />
                        </span>

                        <p
                            className={`bento-item-title-in-box`}
                            style={{
                                ...templateStyle.title,
                                ...customVar.title || defaultVar.title
                            }}
                        >
                            {title}
                        </p>

                    </div>
                </Link>
            );
        }
    }

}

