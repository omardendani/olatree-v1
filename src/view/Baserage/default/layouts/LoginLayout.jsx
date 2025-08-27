import { Link, Outlet } from "react-router-dom";
import { BaserageLogo } from "../assets/baserage/logo/BaserageLogo.jsx";

export default function LoginLayout() {
    return (
        <div className="content-login-signup-forms">

            <div className="form-aside">

                <div className="the-form-side">
                    <div className="baserage-logo">
                        <Link to="/">
                            <span className="baserage-logo-span"><BaserageLogo/></span>
                        </Link>
                    </div>
                    <Outlet />
                </div>

            </div>

            <div className="other-aside-form">

                <div className="img-other-aside-form">
                    <img 
                        src="https://i.pinimg.com/736x/24/ac/67/24ac67c83eb70eeac3fedcd33ecf5624.jpg" 
                        alt="image"
                    />
                </div>

                <div className="texts-other-aside-form">
                    <div className="text-other-aside-form">
                        <p>
                        Baserage is more than just a platform—it's a lifestyle that supports you in every stage of your business journey. From your first steps to your greatest achievements, we're here to guide and inspire you. Together, we make your vision a reality.
                        </p>
                    </div>
                    <div className="infos-img-other-aside-form">
                        <p className="img-title">Ronare Jackobe</p>
                        <p className="img-subtitle">Formula one racing</p>
                    </div>
                </div>

            </div>

        </div>

    );
}
