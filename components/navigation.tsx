"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Archive, Zap, Home, Users, TrendingUp, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Archive className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold animate-glow">The Last Archive</h1>
              <p className="text-xs text-muted-foreground">Preserve what matters</p>
            </div>
          </Link>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">48 hours remaining</p>
            <div className="flex items-center gap-1 text-primary mt-1">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-semibold">LIVE</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-2 overflow-x-auto pb-2">
          <Link href="/">
            <Button variant={isActive("/") ? "default" : "ghost"} className="gap-2 whitespace-nowrap">
              <Home className="w-4 h-4" />
              Archive
            </Button>
          </Link>
          <Link href="/gallery">
            <Button variant={isActive("/gallery") ? "default" : "ghost"} className="gap-2 whitespace-nowrap">
              <Search className="w-4 h-4" />
              Explore
            </Button>
          </Link>
          <Link href="/my-archive">
            <Button variant={isActive("/my-archive") ? "default" : "ghost"} className="gap-2 whitespace-nowrap">
              <Archive className="w-4 h-4" />
              My Archive
            </Button>
          </Link>
          <Link href="/leaderboard">
            <Button variant={isActive("/leaderboard") ? "default" : "ghost"} className="gap-2 whitespace-nowrap">
              <TrendingUp className="w-4 h-4" />
              Trending
            </Button>
          </Link>
          <Link href="/about">
            <Button variant={isActive("/about") ? "default" : "ghost"} className="gap-2 whitespace-nowrap">
              <Users className="w-4 h-4" />
              About
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
