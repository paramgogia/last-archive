"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { MemoryCard } from "@/components/memory-card"
import { useMemories, type Memory } from "@/components/memory-context"
import { Heart } from "lucide-react"

export default function Home() {
  const { memories, addMemory, toggleLike } = useMemories()
  const [input, setInput] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<Memory["category"]>("other")

  const handleArchive = () => {
    addMemory(input, selectedCategory)
    setInput("")
    setSelectedCategory("other")
  }

  const categories: Array<{ value: Memory["category"]; label: string }> = [
    { value: "love", label: "Love" },
    { value: "regrets", label: "Regrets" },
    { value: "wisdom", label: "Wisdom" },
    { value: "final-words", label: "Final Words" },
    { value: "other", label: "Other" },
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
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              What would you save
              <br />
              <span className="text-primary animate-glow">if the internet ended tomorrow?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              In the final moments before everything goes dark, capture the memories that matter most. Your digital
              legacy. Your last words. Your final archive.
            </p>
          </div>

          {/* Input Section */}
          <div className="max-w-2xl mx-auto mb-16">
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-6">
              <div className="mb-4">
                <label className="text-sm font-semibold text-muted-foreground mb-2 block">Category</label>
                <div className="grid grid-cols-5 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
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
              <div className="flex gap-3">
                <Input
                  placeholder="Write your final memory... what would you preserve?"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleArchive()}
                  className="bg-input border-border/50 text-foreground placeholder:text-muted-foreground"
                />
                <Button onClick={handleArchive} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                  Archive
                </Button>
              </div>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{memories.length}</div>
              <p className="text-sm text-muted-foreground">Memories Preserved</p>
            </Card>
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {memories.reduce((sum, m) => sum + m.likes, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Total Resonance</p>
            </Card>
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">∞</div>
              <p className="text-sm text-muted-foreground">Digital Eternity</p>
            </Card>
          </div>

          {/* Memories Grid */}
          {memories.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Heart className="w-6 h-6 text-primary" />
                Your Archive
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {memories.map((memory) => (
                  <MemoryCard key={memory.id} memory={memory} onLike={toggleLike} />
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center py-12 border-t border-border/50">
            <h3 className="text-2xl font-bold mb-4">Ready to preserve your legacy?</h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of others archiving their final moments. This is your last chance to be remembered.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">Start Archiving</Button>
              <Button variant="outline" className="border-border/50 hover:bg-card/50 px-8 bg-transparent">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 backdrop-blur-sm mt-20">
          <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
            <p>The Last Archive • Codepocalypse Hackathon • End of the Internet Award</p>
            <p className="mt-2 text-xs">Built for the final 48 hours. What will you leave behind?</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
