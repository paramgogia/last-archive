"use client"

import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { useMemories } from "@/components/memory-context"
import { Heart, Clock } from "lucide-react"

export default function Leaderboard() {
  const { memories } = useMemories()

  const trendingMemories = [...memories].sort((a, b) => b.likes - a.likes).slice(0, 10)

  const categoryStats = [
    {
      name: "Love",
      count: memories.filter((m) => m.category === "love").length,
      color: "text-red-400",
      bg: "bg-red-400/10",
    },
    {
      name: "Regrets",
      count: memories.filter((m) => m.category === "regrets").length,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      name: "Wisdom",
      count: memories.filter((m) => m.category === "wisdom").length,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      name: "Final Words",
      count: memories.filter((m) => m.category === "final-words").length,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
  ]

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
            <h2 className="text-4xl font-bold mb-2">Trending Memories</h2>
            <p className="text-muted-foreground">The most resonant moments from the archive</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Trending List */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {trendingMemories.map((memory, index) => (
                  <Card
                    key={memory.id}
                    className="bg-card/50 border-border/50 backdrop-blur-sm p-6 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                          <span className="text-lg font-bold text-primary">#{index + 1}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground mb-3 leading-relaxed">{memory.text}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <span className="inline-block px-2 py-1 rounded bg-primary/10 text-primary">
                              {memory.category}
                            </span>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {memory.timestamp}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-primary font-semibold">
                            <Heart className="w-4 h-4 fill-current" />
                            {memory.likes}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Category Stats */}
            <div>
              <h3 className="text-xl font-bold mb-4">Category Breakdown</h3>
              <div className="space-y-3">
                {categoryStats.map((stat) => (
                  <Card key={stat.name} className={`${stat.bg} border-border/50 backdrop-blur-sm p-4`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-semibold ${stat.color}`}>{stat.name}</span>
                      <span className="text-2xl font-bold text-foreground">{stat.count}</span>
                    </div>
                    <div className="w-full bg-border/50 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${stat.color}`}
                        style={{
                          width: `${(stat.count / Math.max(...categoryStats.map((s) => s.count), 1)) * 100}%`,
                        }}
                      />
                    </div>
                  </Card>
                ))}
              </div>

              {/* Overall Stats */}
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-4 mt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {memories.reduce((sum, m) => sum + m.likes, 0)}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Resonance</p>
                </div>
              </Card>
            </div>
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
