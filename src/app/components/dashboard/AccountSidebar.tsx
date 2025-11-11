
import { AccountSidebarProps } from '../../types';
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';
export const AccountSidebar = ({}: AccountSidebarProps) => {
    const pathname = usePathname();
    //console.log(pathname);
    const menuItems = [
        { name: "My Orders", path: "/user/dashboard/", icon: "bi bi-box-seam" },
        { name: "Wishlist", path: "/", icon: "bi bi-heart" },
        { name: "My Address", path: "/user/my-address/", icon: "bi bi-geo-alt" },
        { name: "Account Settings", path: "/user/account-setting/", icon: "bi bi-gear" },
    ];

    const router = useRouter();

    const handleLogout = async () => {
        // Optional confirmation popup
        // ✅ Remove token
        localStorage.removeItem('token');

        // ✅ Redirect to home
        router.push('/');
       
    };

  return (
    <div className="profile-menu collapse d-lg-block" id="profileMenu">
        <div className="user-info aos-init aos-animate" data-aos="fade-right">
            <div className="user-avatar">
                <Image src="/img/ava3-bg.webp" height={88} width={88} alt="Profile" loading="lazy"/>
            </div>
            <h4>yasin pathan</h4>    
        </div>

        <nav className="menu-nav">
            <ul className="nav flex-column dashboard-nav" role="tablist">
                {menuItems.map((item) => (
                    <li key={item.path} className="nav-item" role="presentation">
                        <Link className={`nav-link  ${
            pathname === item.path ? "active" : ""
          }`} href={item.path}>
                            <i className={item.icon}></i>
                            <span>{item.name}</span>
                        </Link>
                    </li>
                ))}
                {/* <li className="nav-item" role="presentation">
                    <Link className="nav-link" href="#">
                        <i className="bi bi-heart"></i>
                        <span>Wishlist</span>
                    </Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link href="/my-address" className="nav-link">
                        <i className="bi bi-geo-alt"></i>
                        <span>My Address</span>
                    </Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link className="nav-link " href="#">
                        <i className="bi bi-gear"></i>
                        <span>Account Settings</span>
                    </Link>
                </li> */}
            </ul>

            <div className="menu-footer">
                
                
                <button onClick={handleLogout} className="logout-link">
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Log Out</span>
                </button>
            </div>
        </nav>
    </div>
  );
};

