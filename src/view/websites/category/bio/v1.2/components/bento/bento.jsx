// Icons
  import { 
    User, Phone, MapTrifold, ArrowDiagonal, ChatCircleDots
  } from "../../assets/icons/Icons.jsx";

  import Paragraph from "../assests/paragraph.jsx";

  const icons = [
    {
      name: 'phone_icon',
      icon: (color) => <Phone color={color} />,
    },
    {
      name: 'user_icon',
      icon: (color) => <User color={color} />,
    },
    {
      name: 'map_icon',
      icon: (color) => <MapTrifold color={color} />,
    },
    {
      name: 'diagonal_arrow_icon',
      icon: (color) => <ArrowDiagonal color={color} />,
    },
    {
      name: 'chat_icon',
      icon: (color) => <ChatCircleDots color={color} />,
    }
  ]

  const iconsMapping = (icon_name, color) => {
    const foundIcon = icons.find(icon => icon.name === icon_name);
    return foundIcon ? foundIcon.icon(color) : null; // Retourne l'icône ou null si non trouvé
  };


export function ButtonIcon({ icon }) {
  const styleClass= 'btn-st1-ic';
  const iconName = icon;

  return (
    <button className={styleClass}>
      {iconName}
    </button>
  );
}

export function Buttons({ type, icon, name, label, text , containerType}) {

  const light_Color = '#ffffff';
  const dark_Color = '#000000';
  
  let styleClass= 'bento-btn-st1-ic';
  let color = dark_Color;

  if( containerType === 'img' ){ 
    styleClass = 'btn-img-st1-ic'; 
    color = dark_Color;
  }

  const buttonIcon = icon;
  const buttonType = type;
  const buttonName = name;
  const buttonLabel = label;
  const buttonText = text;

  if( buttonType === 'simple_icon'){
    return (
      <button className={styleClass}>
        { iconsMapping(buttonIcon, color) }
      </button>
    );
  }

}




export function BentoBox({ bentoType, style, cssClass, content, buttons }) {
  
  const mappingButton = Array.isArray(buttons)
  ? buttons.map((btn, idx) => (
      <div key={idx} className="bento-box-st1-button-wrapper">
        {<Buttons type={btn.type} icon={btn.icon} containerType={bentoType} />}
      </div>
    ))
  : buttons;
    
  return (
    <div className={`bento-box-st1 positionAbsolute ${cssClass.name}`}  style={style}>
      <div className="bento-box-st1-ttl">
        <p>{<Paragraph content={content}/>}</p>
      </div>
      {mappingButton && <div className="bento-box-st1-buttons-place">{mappingButton}</div>}
    </div>
  );
}

export function BentoBoxMessage({ bentoType, style, cssClass, placeholder, buttons }) {
  const mappingButton = Array.isArray(buttons)
  ? buttons.map((btn, idx) => (
      <div key={idx} className="bento-box-st1-button-wrapper">
        {<Buttons type={btn.type} icon={btn.icon} containerType={bentoType}/>}
      </div>
    ))
  : buttons;
  
  return (
    <div className={`bento-box-textarea-st1 positionAbsolute ${cssClass.name}`}  style={style}>
      
      <textarea placeholder={placeholder}></textarea>

      {mappingButton && <div className="bento-box-st1-buttons-place">{mappingButton}</div>}
    </div>
  );
}

export function BentoMediaLink({ style, cssClass, content, mediaLink, mediaIcon, profileName }) {
  const linkMedia = `${mediaLink}`;
  const profile_name = `@${profileName}`;
  
  return (
    <div className={`bento-box-media-link-st1 positionAbsolute ${cssClass.name}`} style={style}>
      <div className="bento-box-media-link-st1-icon">
        <span>{mediaIcon}</span>
      </div>
      <div className="bento-box-media-link-st1-ttl">
        <p>{content}</p>
      </div>
      <div className="bento-box-media-link-st1-url">
        <a href={linkMedia} target="_blank" rel="noopener noreferrer">
          {profile_name}
        </a>
      </div>
    </div>
  );
}

export function BentoImg({ bentoType, style, cssClass, content, src, buttons }) {
  const mappingButton = Array.isArray(buttons)
  ? buttons.map((btn, idx) => (
      <div key={idx} className="bento-box-st1-button-wrapper">
        {<Buttons type={btn.type} icon={btn.icon} containerType={bentoType}/>}
      </div>
    ))
  : buttons;
  return (
    <div className={`bento-box-img-st1 positionAbsolute ${cssClass.name}`} style={style}>
      <img src={src} alt={content} className="bento-img-st1" />
      <div className="bento-box-caption-st1">
        <p>{content}</p>
      </div>
      {mappingButton && <div className="bento-box-img-st1-buttons-place">{mappingButton}</div>}
    </div>
  );
}