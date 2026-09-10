import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const NAV_ITEMS = {
  FARMER: [
    { to: '/farmer/profile', label: 'My Profile' },
    { to: '/farmer/milk-entries', label: 'Milk Entries' },
    { to: '/farmer/advance', label: 'Advance Taken' },
    { to: '/farmer/payments', label: 'Payment History' },
  ],
  OPERATOR: [
    { to: '/operator/today', label: 'Daily Milk Entries' },
    { to: '/operator/milk-entry', label: 'Add Milk Entry' },
    { to: '/operator/fatrate', label: 'FatRate' },
    { to: '/operator/advance-payment', label: 'Advance Payment' },
    { to: '/operator/payment', label: 'Payment' }
  ],
  ADMIN: [
    { to: '/admin/operator', label: 'Add Operator' }
  ],
}

const ROLE_LABEL = {
  FARMER: 'Farmer',
  OPERATOR: 'Operator',
  ADMIN: 'Admin',
}

export default function AppLayout() {
  const { user, logout } = useAuth()
  const items = NAV_ITEMS[user?.role] || []

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 lg:flex">
      <aside className="flex w-full shrink-0 flex-col border-b border-stone-200 bg-stone-900 px-4 py-4 text-stone-100 lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:border-b-0 lg:border-r lg:border-stone-700 lg:px-5 lg:py-6">
        <div className="flex items-center gap-3 lg:mb-8">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-lg font-black text-stone-950 shadow-sm">
            K
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight text-white">Ksheera</div>
            <div className="text-xs text-stone-400">{ROLE_LABEL[user?.role]} panel</div>
          </div>
        </div>

        <nav className="mt-4 flex min-w-0 gap-2 overflow-x-auto pb-1 lg:mt-0 lg:flex-col lg:overflow-visible lg:pb-0">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-stone-900 ${isActive
                ? 'bg-amber-400 text-stone-950 shadow-sm'
                : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                }`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-stone-700 pt-4 lg:mt-auto lg:block">
          <div className="min-w-0 truncate text-[13px] text-stone-300 lg:mb-2.5">
            {user?.name || user?.username}
          </div>
          <button className="shrink-0 rounded-lg border border-stone-600 px-3 py-2 text-sm font-semibold text-stone-200 transition-colors hover:border-amber-400 hover:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-stone-900 lg:w-full" onClick={logout}>
            Log out
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 sm:py-7 lg:ml-64 lg:px-8 lg:py-8">
        <Outlet />
      </main>
    </div>
  )
}
