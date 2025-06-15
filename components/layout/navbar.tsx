"use client"
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar"
import { IconUser } from "@tabler/icons-react"
import { useState } from "react"

export default function Navigation() {
  const navItems = [
    { name: "Accueil", link: "/" },
    { name: "Résumés populaires", link: "/resumes-populaires" },
    { name: "Chat IA", link: "/chat" },
    { name: "Historique", link: "/historique" },
    { name: "Profil", link: "/profil" },
  ]

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="relative w-full">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-3 lg:gap-4 xl:gap-5">
            
            <a 
              href="/inscription" 
              className="flex items-center justify-center w-8 h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 rounded-full bg-brand-50 hover:bg-brand-100 dark:bg-brand-900/20 dark:hover:bg-brand-900/40 transition-all duration-200 hover:scale-105"
              title="Connexion / Inscription"
            >
              <IconUser className="w-4 h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 text-brand-600 dark:text-brand-400" />
            </a>
            
            <NavbarButton variant="primary" href="/chat" className="px-3 py-1.5 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5">
              Analyser un contrat
            </NavbarButton>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-brand-400 font-medium text-sm py-2"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-row items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <a 
                href="/inscription" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-11 h-11 rounded-full bg-brand-50 hover:bg-brand-100 dark:bg-brand-900/20 dark:hover:bg-brand-900/40 transition-all duration-200"
                title="Connexion / Inscription"
              >
                <IconUser className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              </a>
              <NavbarButton 
                onClick={() => setIsMobileMenuOpen(false)} 
                variant="primary" 
                className="flex-1 text-sm py-3"
                href="/chat"
              >
                Analyser un contrat
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  )
}
