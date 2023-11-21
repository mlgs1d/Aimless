import { Link, NavLink, Outlet } from "react-router-dom"
import { useAuth } from "../../auth/Auth"

export default function Navbar() {
  const { signOut } = useAuth()
  const linkStyles = {
    "nonactive": "flex items-center justify-center md:justify-normal w-full py-1 md:py-0 md:rounded-lg hover:bg-lightgray ease duration-150 active:scale-95",
    "active": "flex items-center justify-center md:justify-normal w-full py-1 md:py-0 md:rounded-lg bg-lightgray ease duration-150 active:scale-95"
  }
  return (
    <>
      <main className="h-screen flex">
        <nav class="fixed bottom-0 md:relative w-full md:w-64 bg-background overflow-hidden md:h-full border-t md:border-r md:border-t-0 border-neutral-700 px-1 md:p-2.5">
          <Link to="/" class="hidden md:flex items-center justify-left p-4 gap-3 ease duration-150 active:scale-95">
            <img src="icons/aimless-logo.png" className="w-5"></img>
            <h1 className="font-space-mono font-bold text-2xl text-accent">Aimless</h1>
          </Link>
          <div className="justify-between justify-items-stretch w-full flex flex-row md:flex-col md:py-4 gap-2">
            <NavLink to="/" className={ ({ isActive }) => isActive ? linkStyles.active : linkStyles.nonactive }>
              <span class="inline-flex items-center justify-center h-12 w-12 text-2xl md:text-xl text-foreground"><i class="bx bx-home"></i></span>
              <span className="hidden md:block">Discover Songs</span>
            </NavLink>
            <Link onClick={signOut} className="flex items-center justify-center md:justify-normal w-full py-1 md:py-0 md:rounded-lg hover:bg-lightgray ease duration-150 active:scale-95">
              <span class="inline-flex items-center justify-center h-12 w-12 text-2xl md:text-xl text-foreground"><i class="bx bx-log-out"></i></span>
              <span className="hidden md:block">Sign Out</span>
            </Link>
          </div>
        </nav>
        <Outlet />
      </main>
    </>
  )
}