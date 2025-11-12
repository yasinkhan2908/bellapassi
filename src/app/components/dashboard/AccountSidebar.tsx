import { AccountSidebarProps } from '../../types';
import Link from "next/link";
import Image from "next/image";
import { logoutAction } from '../../actions/auth-actions';

export const AccountSidebar = ({}: AccountSidebarProps) => {
    const menuItems = [
        { name: "My Orders", path: "/user/dashboard", icon: "bi bi-box-seam" },
        { name: "Wishlist", path: "/", icon: "bi bi-heart" },
        { name: "My Address", path: "/user/my-address", icon: "bi bi-geo-alt" },
        { name: "Account Settings", path: "/user/account-setting", icon: "bi bi-gear" },
    ];

    return (
        <div className="profile-menu collapse d-lg-block" id="profileMenu">
            <div className="user-info aos-init aos-animate" data-aos="fade-right">
                <div className="user-avatar">
                    <Image 
                        src="/img/ava3-bg.webp" 
                        height={88} 
                        width={88} 
                        alt="Profile" 
                        loading="lazy"
                    />
                </div>
                <h4>yasin pathan</h4>    
            </div>

            <nav className="menu-nav">
                <ul className="nav flex-column dashboard-nav" role="tablist">
                    {menuItems.map((item) => (
                        <li key={item.path} className="nav-item" role="presentation">
                            <Link className="nav-link" href={item.path}>
                                <i className={item.icon}></i>
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="menu-footer">
                    <form action={logoutAction}>
                        <button type="submit" className="logout-link">
                            <i className="bi bi-box-arrow-right"></i>
                            <span>Log Out</span>
                        </button>
                    </form>
                </div>
            </nav>
        </div>
    );
};