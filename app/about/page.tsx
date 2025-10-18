"use client"

import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Archive, Heart, Zap, Users } from "lucide-react"

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10">
        <Navigation />

        <section className="max-w-4xl mx-auto px-4 py-20">
          {/* Hero */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">About The Last Archive</h2>
            <p className="text-xl text-muted-foreground">
              A project exploring what we'd preserve if the internet ended tomorrow
            </p>
          </div>

          {/* Mission */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-8 mb-12">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Last Archive is a thought experiment wrapped in a beautiful interface. It asks a profound question:
              What would you preserve if you only had 48 hours before the internet disappeared forever?
            </p>
            <p className="text-muted-foreground leading-relaxed">
              In a world of infinite digital noise, we often forget what truly matters. This project invites you to
              reflect on your most important memories, your deepest regrets, your hardest-won wisdom, and your final
              words to the world.
            </p>
          </Card>

          {/* Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-6">
                <Archive className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-bold mb-2">Archive Your Memories</h4>
                <p className="text-sm text-muted-foreground">
                  Preserve your most important moments with categorized memories
                </p>
              </Card>
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-6">
                <Heart className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-bold mb-2">Connect & Resonate</h4>
                <p className="text-sm text-muted-foreground">
                  Like memories that resonate with you and see what matters to others
                </p>
              </Card>
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-6">
                <Zap className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-bold mb-2">Explore Trending</h4>
                <p className="text-sm text-muted-foreground">
                  Discover the most resonant memories from the global archive
                </p>
              </Card>
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-6">
                <Users className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-bold mb-2">Join the Community</h4>
                <p className="text-sm text-muted-foreground">
                  Be part of a global movement to preserve what matters most
                </p>
              </Card>
            </div>
          </div>

          {/* Categories */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-8 mb-12">
            <h3 className="text-2xl font-bold mb-6">Memory Categories</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-red-400 mb-2">Love</h4>
                <p className="text-sm text-muted-foreground">Moments of connection, affection, and deep human bonds</p>
              </div>
              <div>
                <h4 className="font-bold text-blue-400 mb-2">Regrets</h4>
                <p className="text-sm text-muted-foreground">Lessons learned from mistakes and missed opportunities</p>
              </div>
              <div>
                <h4 className="font-bold text-purple-400 mb-2">Wisdom</h4>
                <p className="text-sm text-muted-foreground">Hard-won insights and truths you've discovered</p>
              </div>
              <div>
                <h4 className="font-bold text-yellow-400 mb-2">Final Words</h4>
                <p className="text-sm text-muted-foreground">Your last message to the world before everything ends</p>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center py-12 border-t border-border/50">
            <h3 className="text-2xl font-bold mb-4">Ready to preserve your legacy?</h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of others archiving their final moments. What will you leave behind?
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">Start Archiving Now</Button>
          </div>
        </section>

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
