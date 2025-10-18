"use client"

import { Navigation } from "@/components/navigation"
import { MemoryCard } from "@/components/memory-card"
import { useMemories } from "@/components/memory-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function MyArchive() {
  const { memories, toggleLike, deleteMemory } = useMemories()

  const stats = {
    total: memories.length,
    totalLikes: memories.reduce((sum, m) => sum + m.likes, 0),
    categories: {
      love: memories.filter((m) => m.category === "love").length,
      regrets: memories.filter((m) => m.category === "regrets").length,
      wisdom: memories.filter((m) => m.category === "wisdom").length,
      "final-words": memories.filter((m) => m.category === "final-words").length,
      other: memories.filter((m) => m.category === "other").length,
    },
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(memories, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `last-archive-${new Date().toISOString().split("T")[0]}.json`
    link.click()
  }

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
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl font-bold mb-2">My Archive</h2>
                <p className="text-muted-foreground">Your personal collection of preserved memories</p>
              </div>
              <Button onClick={handleExport} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">{stats.total}</div>
                <p className="text-xs text-muted-foreground">Total Memories</p>
              </Card>
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">{stats.totalLikes}</div>
                <p className="text-xs text-muted-foreground">Total Resonance</p>
              </Card>
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-4 text-center">
                <div className="text-2xl font-bold text-red-400 mb-1">{stats.categories.love}</div>
                <p className="text-xs text-muted-foreground">Love</p>
              </Card>
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-4 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">{stats.categories.regrets}</div>
                <p className="text-xs text-muted-foreground">Regrets</p>
              </Card>
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">{stats.categories["final-words"]}</div>
                <p className="text-xs text-muted-foreground">Final Words</p>
              </Card>
            </div>
          </div>

          {/* Memories */}
          {memories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {memories.map((memory) => (
                <MemoryCard
                  key={memory.id}
                  memory={memory}
                  onLike={toggleLike}
                  onDelete={deleteMemory}
                  showDelete={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">You haven't archived any memories yet.</p>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Start Archiving</Button>
            </div>
          )}
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
