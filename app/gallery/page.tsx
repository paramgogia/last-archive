"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { MemoryCard } from "@/components/memory-card"
import { useMemories, type Memory } from "@/components/memory-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function Gallery() {
  const { memories, toggleLike } = useMemories()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<Memory["category"] | "all">("all")

  const categories: Array<{ value: Memory["category"] | "all"; label: string }> = [
    { value: "all", label: "All" },
    { value: "love", label: "Love" },
    { value: "regrets", label: "Regrets" },
    { value: "wisdom", label: "Wisdom" },
    { value: "final-words", label: "Final Words" },
    { value: "other", label: "Other" },
  ]

  const filteredMemories = memories.filter((memory) => {
    const matchesSearch = memory.text.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || memory.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedMemories = [...filteredMemories].sort((a, b) => b.likes - a.likes)

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10">
        <Navigation />

        <section className="max-w-6xl mx-auto px-4 py-20">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">Explore the Archive</h2>
            <p className="text-muted-foreground mb-8">
              Discover memories from across the community. What resonates with you?
            </p>

            {/* Search */}
            <div className="mb-6">
              <div className="flex gap-3">
                <Input
                  placeholder="Search memories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-input border-border/50 text-foreground placeholder:text-muted-foreground"
                />
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  <Search className="w-4 h-4" />
                  Search
                </Button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                    selectedCategory === cat.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border/50 text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div>
            <p className="text-sm text-muted-foreground mb-6">
              {sortedMemories.length} memory{sortedMemories.length !== 1 ? "ies" : ""} found
            </p>
            {sortedMemories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedMemories.map((memory) => (
                  <MemoryCard key={memory.id} memory={memory} onLike={toggleLike} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No memories found. Try a different search.</p>
              </div>
            )}
          </div>
        </section>

        <footer className="border-t border-border/50 backdrop-blur-sm mt-20">
          <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
            <p>The Last Archive • Codepocalypse Hackathon</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
