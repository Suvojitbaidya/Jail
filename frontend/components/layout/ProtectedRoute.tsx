"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/commons/Sidebar";
import Navbar from "../commons/Navbar";
import Link from "next/link";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user]);

  if (!user) return null;

  return (
    <>
      <main className={`main_for_padding ${collapsed ? "sidebar-collapsed" : ""}`}
        suppressHydrationWarning={true}>
        {/* <!-- Navbar --> */}
        <div>
          <Navbar />
          {/* <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
              <div></div>
              <div className="d-flex align-items-center gap-2">
                <Link href="/view-table" className="nav-link d-flex align-items-center">
                  <i className="fas fa-table me-2"></i> View Table
                </Link>
                <div className="search-container">
                  <form id="searchForm">
                    <div className="search-box">
                      <input
                        type="text"
                        id="searchInput"
                        placeholder="Search..."
                      />
                      <button
                        type="submit"
                        className="search-btn border-0 bg-transparent p-0"
                      >
                        <i className="fas fa-search search-icon"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        {children}
      </main>
    </>
  );
}
