import { NavLink, Outlet } from 'react-router-dom'

const navLinkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-white/10 text-navy-foreground'
      : 'text-navy-muted hover:bg-white/5 hover:text-navy-foreground'
  }`

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-navy text-navy-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <div>
            <p className="text-lg font-bold tracking-tight">ARIMO</p>
            <p className="text-xs text-navy-muted">Predictive Maintenance</p>
          </div>
          <nav className="flex items-center gap-1">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/design-system" className={navLinkClass}>
              Design System
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
