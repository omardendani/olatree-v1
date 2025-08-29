// 1. CONFIGURATION ET CONSTANTES
    // config/bentoConfig.js

import { usePageData } from "../../../../../../../../contexts/PageDataContext";

export const GENERAL_CONFIG = {
    BENTO_GRID_GAP: 16
};

const COMMON_SETTINGS = {
    MAX_SEARCH_STEPS: 20,
    ANIMATION_DURATION: 0.1,
    PREVIEW_OPACITY: 0.7,
    PREVIEW_SCALE: 0.95,
    DEBOUNCE_DELAY: 16
};

export const GRID_CONFIG = { 
    DESKTOP: {
        MAX_COLUMNS: 6,
        ...COMMON_SETTINGS
    },
    MOBILE: {
        MAX_COLUMNS: 4,
        ...COMMON_SETTINGS
    }
};

export const design_system = {
    
    typography: {

        headline: {
            h1: {
                size: '67px',
                weight: '400',
                lineHeight: '0.9',
                letterSpacing: '-0.5px'
            },
            h2: {
                size: '50px',
                weight: '400',
                lineHeight: '0.9',
                letterSpacing: '-1px'
            },
            h3: {
                size: '37px',
                weight: '400',
                lineHeight: '0.9',
                letterSpacing: '-1px'
            },
            h4: {
                size: '28px',
                weight: '400',
                lineHeight: '0.9',
                letterSpacing: '-1px'
            },
            h5: {
                size: '21px',
                weight: '300',
                lineHeight: '0.9',
                letterSpacing: '-1px'
            }
        },
        body: {
            b1: {
                size: '18px',
                weight: '400',
                lineHeight: '1.2',
                letterSpacing: '-1px'
            },
            b2: {
                size: '16px',
                weight: '400',
                lineHeight: '1.2',
                letterSpacing: '-1px'
            },
            b3: {
                size: '14px',
                weight: '400',
                lineHeight: '1.2',
                letterSpacing: '-1px'
            }
        },
        button: {
            btn1: {
                size: '14px',
                weight: '400',
                lineHeight: '1.2',
                letterSpacing: '-0.5px'
            }
        },
        link: {
            link1: {
                size: '14px',
                weight: '400',
                lineHeight: '1.2',
                letterSpacing: '-0.5px'
            }
        }
    },
    widget: {
        container: {
            with: {
                style: {
                    background: 'var(--bg)',
                    padding: '16px',
                    borderRadius: '8px'
                }
            },
            without: {
                style: {
                    background: 'none',
                    padding: '0',
                    borderRadius: '0'
                }
            }
        },
        default: {
            small: {
                style: {
                    padding: '10px',
                    borderRadius: '18px'
                }
            },
            regular: {
                style: {
                    backgroundColor: 'hsl(0deg 0% 97%)',
                    boxShadow: 'rgb(242 242 242) 0px 0px 0px 0px',
                    padding: '16px',
                    borderRadius: '8px'
                }
            }
        },
        stat: {
            title: {
                style: {
                    color: 'var(--txt-color)',
                    fontFamily: 'var(--font-family)',
                    lineHeight: 'var(--txt-lineHeight)',
                    fontSize: 'var(--txt-fontSize)',
                    fontWeight: 'var(--txt-fontWeight)',
                    letterSpacing: 'var(--txt-letterSpacing)',
                }
            },
            value: {
                style: {
                    color: 'var(--txt-color)',
                    fontFamily: 'var(--font-family)',
                    lineHeight: 'var(--txt-lineHeight)',
                    fontSize: 'var(--txt-fontSize)',
                    fontWeight: 'var(--txt-fontWeight)',
                    letterSpacing: 'var(--txt-letterSpacing)',
                }
            }
        }
    }
}

export const WIDGET_TEMPLATE = {
    title: {
        id: 5,
        content: {
            type: 'title',
            style: {
                container: {
                    backgroundColor: 'transparent',
                    boxShadow: 'rgb(242 242 242) 0px 0px 0px 0px',
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "end",
                    padding: design_system.widget.default.regular.style.padding,
                    borderRadius: design_system.widget.default.regular.style.borderRadius
                },
                title: {
                    color: 'var(--color)',
                    fontFamily: 'var(--font-family)',
                    lineHeight: design_system.typography.headline.h5.lineHeight,
                    fontSize: design_system.typography.headline.h5.size,
                    fontWeight: design_system.typography.headline.h4.weight,
                    letterSpacing: design_system.typography.headline.h5.letterSpacing,
                }
            },
            var: {
                container: {
                    
                },
                title: {
                    "--color": "#000000"
                }
            },
            content: {
                title: 'Text...'
            }
        }
    },
    rich_text: {
        id: 2,
        content: {
            type: 'rich_text',
            style: {
                container: {
                    background: 'var(--bg)',
                    boxShadow: 'rgb(242 242 242) 0px 0px 0px 0px',
                    backgroundPosition: "--bg-position",
                    backgroundSize: "cover",
                    padding: design_system.widget.default.regular.style.padding,
                    borderRadius: design_system.widget.default.regular.style.borderRadius,
                },
                text: {
                    color: 'var(--color)',
                    fontFamily: 'var(--font-family)',
                    lineHeight: "var(--lineHeight)",
                    fontSize: "var(--fontSize)",
                    fontWeight: "var(--fontWeight)",
                    letterSpacing: "var(--letterSpacing)",
                }
            },
            var: {
                container: {
                    "--bg": "#dddddd",
                    "--bg-position": "50% 50%"
                },
                text: {
                    "--color": "#000000",
                    "--lineHeight": "1.2",
                    "--fontSize": "16px",
                    "--fontWeight": "400",
                    "--letterSpacing": "-1px"
                }
            },
            content: {
                value: 'Text...'
            }
        }
    },
    stat: {
        id: 1,
        content: {
            type: 'stat',
            style: {
                container: {
                    backgroundColor: 'var(--bg)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: design_system.widget.default.regular.style.padding,
                    borderRadius: design_system.widget.default.regular.style.borderRadius
                },
                title: {
                    color: 'var(--color)',
                    fontFamily: 'var(--font-family)',
                    opacity: 'var(--opacity)',
                    lineHeight: design_system.typography.body.b3.lineHeight,
                    fontSize: design_system.typography.body.b3.size,
                    fontWeight: design_system.typography.body.b3.weight,
                    letterSpacing: design_system.typography.body.b3.letterSpacing,
                },
                value: {
                    color: 'var(--color)',
                    fontFamily: 'var(--font-family)',
                    opacity: 'var(--opacity)',
                    lineHeight: design_system.typography.headline.h1.lineHeight,
                    fontSize: design_system.typography.headline.h1.size,
                    fontWeight: design_system.typography.headline.h1.weight,
                    letterSpacing: design_system.typography.headline.h1.letterSpacing,
                }
            },
            var: {
                container: {
                    "--bg": "hsl(136.25deg 100% 66%)" 
                },
                title: {
                    "--color": "#000000",
                    "--opacity": "1"
                },
                value: {
                    "--color": "#000000",
                    "--opacity": "1"
                }
            },
            content: {
                title: 'Title',
                value: 'Value'
            }
        }
    },
    link: {
        id: 3,
        content: {
            type: 'link',
            style: {
                container: {
                    backgroundColor: 'var(--bg)',
                    boxShadow: 'rgb(242 242 242) 0px 0px 0px 0px',
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: design_system.widget.default.regular.style.padding,
                    borderRadius: design_system.widget.default.regular.style.borderRadius
                },
                span: {
                    display: "block",
                    height: "40px",
                    width: "40px",
                    borderRadius: "6px",
                    overflow: "hidden",
                },
                title: {
                    color: 'var(--color)',
                    fontFamily: 'var(--font-family)',
                    lineHeight: design_system.typography.body.b2.lineHeight,
                    fontSize: design_system.typography.body.b2.size,
                    fontWeight: design_system.typography.body.b2.weight,
                    letterSpacing: design_system.typography.body.b2.letterSpacing,
                },
                subTitle: {
                    color: 'var(--color)',
                    fontFamily: 'var(--font-family)',
                    lineHeight: design_system.typography.body.b3.lineHeight,
                    fontSize: design_system.typography.body.b3.size,
                    fontWeight: design_system.typography.body.b3.weight,
                    letterSpacing: design_system.typography.body.b3.letterSpacing,
                }
            },
            var: {
                container: {
                    "--bg": "#f5f5f5"
                },
                title: {
                    "--color": "#000000"
                },
                subTitle: {
                    "--color": "#000000"
                }
            },
            content: {
                icon: {
                    style: 's1',
                    content: 'instagram'
                },
                title: "Title",
                subTitle: "Sub title",
                url: '#Link_url'
            }
        }
    },
    cta: {
        id: 4,
        content: {
            type: 'cta',
            style: {
                container: {
                    backgroundColor: 'var(--bg)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: design_system.widget.default.regular.style.padding,
                    borderRadius: design_system.widget.default.regular.style.borderRadius
                },
                value: {
                    color: 'var(--color)',
                    fontFamily: 'var(--font-family)',
                    lineHeight: "var(--lineHeight)",
                    fontSize: "var(--fontSize)",
                    fontWeight: "var(--fontWeight)",
                    letterSpacing: "var(--letterSpacing)",
                },
                btn: {
                    container: {
                        
                    },
                    content: {
                        text: {
                            color: 'var(--color)',
                            fontFamily: 'var(--font-family)',
                            lineHeight: "var(--lineHeight)",
                            fontSize: "var(--fontSize)",
                            fontWeight: "var(--fontWeight)",
                            letterSpacing: "var(--letterSpacing)",
                            cursor: 'pointer',
                        },
                        icon: {
                            background: "var(--bg)",
                            boxShadow: '#dcdcdc 0px 0px 0px 0px',
                            display: "block",
                            height: "55px",
                            width: "55px",
                            padding: "20%",
                            borderRadius: "8px",
                            cursor: 'pointer',
                        },
                        txt_icon: {
                            background: "var(--bg)",
                            boxShadow: '#dcdcdc 0px 0px 0px 0px',
                            display: "block",
                            height: "45px",
                            minWidth: "45px",
                            padding: "7px 12px",
                            borderRadius: "45px",
                            gap: "6px",
                            display: "flex",
                            flexDirection: "row-reverse",
                            alignItems: "center",
                            justifyContent: "space-between",
                            cursor: 'pointer',
                        }
                    }
                }
                
            },
            var: {
                container: {
                    "--bg": "#f8f8f8"
                },
                value: {
                    "--color": "#000000",
                    "--lineHeight": "1.2",
                    "--fontSize": "24px",
                    "--fontWeight": "400",
                    "--letterSpacing": "-0.6px"
                },
                btn: {
                    content: {
                        text: { 
                        "--color": "#ffffff",
                        "--lineHeight": "1.2",
                        "--fontSize": "16px",
                        "--fontWeight": "400",
                        "--letterSpacing": "-0.5px"
                        },
                        icon: { "--bg": "#101010"},
                        txt_icon: { "--bg": "#101010"}
                    }
                }
            },
            content: {
                value: 'Call to action',
                btn: {
                    action: {
                        type: 'url',
                        url: '#Call-to-action'
                    },
                    style: 'text',
                    value: {
                        text: 'cta btn',
                        icon: null,
                    },
                }
            }
        }
    }
};


export const BENTO_ITEMS = [
    {
        id: 1,
        content: {
            type: 'stat',
            var: {
                container: {
                    "--bg": "#000000" 
                },
                title: {
                    "--color": "#ffffffff",
                    "--opacity": "1"
                },
                value: {
                    "--color": "#ffffffff",
                    "--opacity": "1"
                }
            },
            content: {
                title: 'Clients',
                value: '+39K'
            }
        },
        style: {
            mobile: { h: 2, w: 2 },
            desktop: { h: 2, w: 2 }
        },
        position: {
            mobile: { x: 0, y: 1 },
            desktop: { x: 0, y: 1 }
        }
    },
    {
        id: 2,
        content: {
            type: 'rich_text',
            var: {
                container: {
                    "--bg": "#dddddd"
                },
                text: {
                    "--color": "#000000"
                }
            },
            content: {
                value: 'Hey! Treepath is the place where you have all what you need for boosting your business more high'
            }
        },
        style: {
            mobile: { h: 4, w: 4 },
            desktop: { h: 4, w: 4 }
        },
        position: {
            mobile: { x: 0, y: 3 },
            desktop: { x: 2, y: 1 }
        }
    },
    {
        id: 3,
        content: {
            type: 'link',
            var: {
                container: {
                    "--bg": "#f5f5f5"
                },
                title: {
                    "--color": "#000000"
                },
                subTitle: {
                    "--color": "#000000"
                }
            },
            content: {
                icon: {
                    style: 's1',
                    content: 'instagram'
                },
                title: "Instagram",
                subTitle: "treepath.co",
                url: 'https://instagram.com/treepath.co'
            }
        },
        style: {
            mobile: { h: 2, w: 2 },
            desktop: { h: 2, w: 2 }
        },
        position: {
            mobile: { x: 2, y: 7 },
            desktop: { x: 2, y: 5 }
        }
    },
    {
        id: 4,
        content: {
            type: 'cta',
            var: {
                container: {
                    "--bg": "#dddddd"
                },
                value: {
                    "--color": "#000000"
                },
                btn: {
                    content: {
                        text: {"--color": "#000000"}
                    }
                }
            },
            content: {
                value: 'Get a quote now!',
                btn: {
                    action: {
                        type: 'url',
                        url: '#Let\'s Talk'
                    },
                    style: 'text',
                    value: {
                        text: 'Let\'s Talk',
                        icon: null,
                    },
                }
            }
        },
        style: {
            mobile: { h: 2, w: 2 },
            desktop: { h: 2, w: 2 }
        },
        position: {
            mobile: { x: 0, y: 7 },
            desktop: { x: 0, y: 3 }
        }
    },
    {
        id: 5,
        content: {
            type: 'title',
            var: {
                title: {
                    "--color": "#000000"
                }
            },
            content: {
                title: 'Hi, this is a title!'
            }
        },
        style: {
            mobile: { h: 1, w: 4 },
            desktop: { h: 1, w: 6 }
        },
        position: {
            mobile: { x: 0, y: 0 },
            desktop: { x: 0, y: 0 }
        }
    },
    {
        id: 7,
        content: {
            type: 'link',
            var: {
                container: {
                    "--bg": "#f5f5f5"
                },
                title: {
                    "--color": "#000000"
                },
                subTitle: {
                    "--color": "#000000"
                }
            },
            content: {
                icon: {
                    style: null,
                    content: null
                },
                title: null,
                subTitle: null,
                url: 'https://facebook.com'
            }
        },
        style: {
            mobile: { h: 2, w: 2 },
            desktop: { h: 2, w: 2 }
        },
        position: {
            mobile: { x: 2, y: 9 },
            desktop: { x: 4, y: 5 }
        }
    },
];

export function widgetItems(){
    // Page data :
    const data = usePageData();   // Data door ...

    const widget = data.widget;
    const widgetType = widget.type;
    const widgetItems = widget.items;   // Widget Items

    return widgetItems
}
