"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const menuItems = [
  { href: "/dashboard", icon: "fas fa-tachometer-alt", label: "Dashboard" },
  { href: "/dashboard/alert", icon: "fas fa-bell", label: "Alerts" },
  { href: "/dashboard/cameras", icon: "fa-solid fa-camera", label: "Camera View" },
  { href: "/dashboard/cameras/new", icon: "fas fa-plus-circle", label: "Add New Camera" },
  { href: "/report", icon: "fas fa-tachometer-alt", label: "Report" },
  { href: "/movement-tracking", icon: "fas fa-eye", label: "Movement Tracking" },
  { href: "/dashboard/upload", icon: "fas fa-upload", label: "Upload a Photo" },
  { href: "/dashboard/person-identification", icon: "fas fa-id-card", label: "Person Identification" },
  { href: "/dashboard/profile-managment", icon: "fas fa-user", label: "Profile Management" },
  { href: "/dashboard/search", icon: "fas fa-search", label: "Search" },
  { href: "/dashboard/setings", icon: "fas fa-gear", label: "Settings" },
];

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    setUser(null);
    router.push("/login");
  };

  return (
    <section className={`side_menubar${collapsed ? " collapsed" : ""}`}>
      <div className="menu-overlay"></div>
      <div className="side-menu">
        <button
          className="toggle-btn-sidebar"
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label="Toggle sidebar"
        >
          {collapsed ? (
            <i className="fas fa-times"></i> // Hamburger icon when collapsed
          ) : (
            <i className="fas fa-bars"></i> // Close icon when expanded
          )}
        </button>
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li key={item.href} className={pathname === item.href ? "active" : ""}>
              <Link href={item.href}>
                <i className={item.icon}></i>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
          <li>
            <a onClick={handleLogout} className="btn fs-6">
              <i className="fas fa-sign-out-alt"></i>
              {!collapsed && <span>Logout</span>}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Sidebar;