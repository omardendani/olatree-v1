import { useRef, useEffect, useState } from "react";


const profile_settings_data = {
    settings: [
        {
            name: "Profile Name",
            settingList: {
                title: "Change Profile Name",
                value: "Omardendani",
                type: "profilename",
                id: "setting_profilename"
            },
            form: {
                title: "Change Profile Name",
                subtitle: "Choose a new profile name for your page.",
                placeholder: "New Profile Name",
            }
        },
        {
            name: "Email",
            settingList: {
                title: "Change Email",
                value: "omardendani@gmail.com",
                type: "email",
                id: "setting_email"
            },
            form: {
                title: "Change Email",
                subtitle: "Change the email you use to log in to Baserage.",
                placeholder: "New Email",
            }
        },
        {
            name: "Password",
            settingList: {
                title: "Change Password",
                value: "********",
                type: "password",
                id: "setting_password"
            },
            form: {
                title: "Change Password",
                subtitle: "Change the password you use to log in to Baserage.",
                placeholder: "New Password",
            }
        }
    ]
};

// Buttons 
    function MenuButtons({ name, icon, onClick }) {
        return (
            <button className="dash-menu-button" type="button" onClick={onClick}>
                {icon ? <span>{icon}</span> : null}
                {name}
            </button>
        );
    }

export default function Dashboard({ children }){

    return (
        <div className="dash-container">

            <div className="dash-menu">
                <MenuButtons 
                    name="Mode" 
                    icon={null}
                    onClick={null}
                />
                <MenuButtons 
                    name="Dashboard" 
                    icon={null}
                    onClick={null}
                />
                <MenuButtons 
                    name="Settings" 
                    icon={null}
                    onClick={null}
                />
            </div>

            {children}
        </div>
    );
}
