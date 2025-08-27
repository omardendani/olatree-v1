// 1. CONFIGURATION ET CONSTANTES
// config/bentoConfig.js

const themes = [
    {
        "id": 1,
        "name": "Default",
        "themes": [
            {
                "id": 1,
                "name": "Default",
                "container": {
                    "className": "container_item_df_style",
                    "var": {
                        "--bg-color": "#ffffff",
                        "--box-shadow": "rgb(242, 242, 242) 0px 0px 0px 1px",
                        "--border-radius": "12px",
                        "--padding": "15px"
                    }
                },
                "content": {
                    "text": {
                        "h1": {
                            "className": "content_item_txt_df_style",
                            "var": {
                                "--color": "#000000",
                                "--font-size": "24px",
                                "--font-weight": "400",
                                "--font-family": "inherit"
                            }
                        },
                        "h2": {
                            "className": "content_item_txt_df_style",
                            "var": {
                                "--color": "#000000",
                                "--font-size": "19px",
                                "--font-weight": "400",
                                "--font-family": "inherit"
                            }
                        }
                    },
                    "buttons": {
                        "link": {
                            "container": {
                                "className": "content_item_btn_link_df_style"
                            },
                            "content": {
                                "icon": {
                                    "type": "svg",
                                    "name": "arrow",
                                    "path": null
                                },
                                "style": {
                                    "color": "#ffffff",
                                    "width": "12px"
                                }
                            }
                        },
                        "action": {
                            "container": {
                                "className": "content_item_btn_action_df_style",
                                "var": {
                                    "--bg-color": "#ffffff",
                                    "--box-shadow": "0 0 0 1px rgba(0, 0, 0, 0.5)",
                                    "--width": "32px",
                                    "--height": "32px"
                                }
                                
                            },
                            "content": {
                                "icon": {
                                    "type": "svg",
                                    "name": null,
                                    "path": null
                                },
                                "style": {
                                    "color": "#333333",
                                    "width": "12px"
                                }
                            }
                        }
                    }
                }
            }
        ]
    }
]

export const BENTO_ITEMS = [
    {
        id: 1,
        content: {
            type: 'text',
            style: {
                background: {
                    color: null,
                    img: null
                },
                border: {
                    width: null,
                    style: null,
                    color: null,
                    radius: null
                },
                padding: null,
                shadow: {
                    x: null,
                    y: null,
                    blur: null,
                    color: null
                },
                container: {
                    backgroundColor: 'rgb(250 250 250)',
                    boxShadow: 'rgb(242 242 242) 0px 0px 0px 1px',
                    padding: '20px',
                    borderRadius: '12px',
                },
                text: {
                    color: '#000000',
                    lineHeight: 1.2,
                    fontSize: '1.5em',
                    fontWeight: 400,
                    fontFamily: 'Poppins',
                    letterSpacing: '-0.5px',
                }
            },
            content: 'Hello World\nWelcome'
        },
        style: {
            mobile: "2x2",
            desktop: { h: 2, w: 2 }
        },
        position: {
            mobile: { x: 0, y: 0 },
            desktop: { x: 0, y: 0 }
        }
    },
    {
        id: 4,
        content: {
            type: 'link',
            style: {
                container: {
                    backgroundColor: 'rgb(250 250 250)',
                    boxShadow: 'rgb(242 242 242) 0px 0px 0px 1px',
                    padding: '20px',
                    borderRadius: '12px',
                },
                text: {
                    title: {
                        color: '#000000',
                        lineHeight: 1.2,
                        fontSize: '1.15em',
                        fontWeight: 400,
                        fontFamily: 'Poppins',
                        letterSpacing: '-0.5px',
                    },
                    text: {
                        color: 'rgb(106 106 106)',
                        lineHeight: 1,
                        fontSize: '0.9em',
                        fontWeight: 400,
                        fontFamily: 'Poppins',
                        letterSpacing: '-1px',
                    }
                    
                }
            },
            content: {
                icon: {
                    style: 's1',
                    content: 'instagram'
                },
                title: "Instagram",
                text: "Treepath",
                url: 'https://instagram.com/treepath.co'
            }
        },
        style: {
            mobile: "2x2",
            desktop: { h: 2, w: 2 }
        },
        position: {
            mobile: { x: 0, y: 0 },
            desktop: { x: 0, y: 4 }
        }
    }
];


/**
 *      Ca c'est le design de database d'un software (SAAS / SOFTWARE AS A SERVICE)
 *      l'idee de Saas est de permetre au utilisateur de creer des page web, presque comme l'idee de linktree avec des functionnaliter plus avancer,
 *      comme il permetre de ajouter des photos, personaliser le style, controller la structure de bento section ...
 *      
 *      Respect ce type d'ecritire, et ajoute les table de time/date de creation, et ajoute se que on a parler sur
 *       
 *      table:  page_types: [ FIX ]
 *              ----------------------------------------------------------------------------------------------------------------------
 *              id        name          desc        version
 *              
 *              1         Personal      {desc}      1.0
 *              2         Professional  {desc}      1.0
 *              3         Business      {desc}      1.0
 *      
 *      table:  Users:
 *              ---------------------------------------------------------------------------
 *              id      username    password 
 * 
 *      table:  User details:
 *              ---------------------------------------------------------------------------
 *              id      user_id     firstname       lastname        birthdate       gender
 * 
 *      table:  Contact:
 *              ------------------------------------------------------------------------------------------------------------
 *              id      owner_type (user/page)     owner_id (FK)       type (email/phone)       value       whatsapp (boolean - if phone)    primary    is_verified
 * 
 *      table:  Pages:
 *              -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 *              id      user_id (FK)    page_type_id (FK)    name (unique)      active (boolien)
 * 
 *      table:  Page_settings:
 *              -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 *              id      page_id (FK)    language    timezone     seo_title    seo_description     favicon
 * 
 *      table:  Page_content:
 *              -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 *              id      page_id (FK)    logo    heading     body    content_json
 * 
 *      
 *      // pour le logo et les images, un folder /unpoads/user_id/{image-name}+{user_id}+{ext}
 * 
 * 
 * 
 *      colomnes: -> content:    (json) {
 *                      
 *                      
 * 
 *                   }
 * 
 *          position (json) format -> {
 *                                      'desktop': {x,y},
 *                                      'mobile': {x,y}  
 *                                    } 
 * 
 *          style (json) format -> {
 *                                   'desktop': {...},
 *                                   'mobile': {...}  
 *                                 } 
 * 
 * ----------------------------------------------------------------------------------
 * 
 * 
 * 
 *      table:  Page Styles:
 *              ----------------------------------------------------------------------------------------------------------------------
 *              id      page_id     bg_color    side_padding
 * 
 *      Table:  Bento Section:
 *              ----------------------------------------------------------------------------------------------------------------------
 *              id      page_id     grid_gap        padding
 *      
 *      Table:  Bento Typography Style:
 *              ----------------------------------------------------------------------------------------------------------------------
 *              id      page_id     font    size      caption_font      caption_size
 * 
 *      Table:  Default_Widgets
 *              ----------------------------------------------------------------------------------------------------------------------
 *              id      name        min_size        max_size
 *              ----------------------------------------------------------------------------------------------------------------------
 *              1       rich_text   {2,2}           {8,4} 
 * 
 *      Table:  Widgets
 *              ----------------------------------------------------------------------------------------------------------------------
 *              id      page_id     Type        position        size        min_size      max_size
 *              ----------------------------------------------------------------------------------------------------------------------
 *              1       {id}        Custom      {y,x}           {2,2}       {2,2}         {8,8}
 *              2       {id}        Map         {y,x}           {2,2}       {2,2}         {8,8}
 *              3       {id}        Link        {y,x}           {2,2}       {2,2}         {8,8}
 *              4       {id}        Cta         {y,x}           {2,2}       {2,2}         {8,8}
 *              5       {id}        Image       {y,x}           {2,2}       {2,2}         {8,8}
 *              6       {id}        Video       {y,x}           {2,2}       {2,2}         {8,8}
 * 
 * 
 *      Table:  Cta Widget
 *              ---------------------------------------- ------------------------------------------------------------------------------
 *              id      widget_id       text            caption         bg_color          button
 *              ----------------------------------------------------------------------------------------------------------------------
 *              23      4               {rich text}     {rich text}     {json variables}        
 *              
 * 
 *      Table:  Components Text
 *              -----------------------------------------------------------------------
 *              id      widget_id       text    small_text      text_style
 */