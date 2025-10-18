"use client"

import { Heart, Trash2, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Memory } from "./memory-context"

interface MemoryCardProps {
  memory: Memory
  onLike: (id: string) => void
  onDelete?: (id: string) => void
  showDelete?: boolean
}

const categoryColors = {
  love: "text-red-400",
  regrets: "text-blue-400",
  wisdom: "text-purple-400",
  "final-words": "text-yellow-400",
  other: "text-gray-400",
}

const categoryLabels = {
  love: "Love",
  regrets: "Regrets",
  wisdom: "Wisdom",
  "final-words": "Final Words",
  other: "Other",
}

export function MemoryCard({ memory, onLike, onDelete, showDelete }: MemoryCardProps) {
  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-6 hover:border-primary/50 transition-colors group">
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs font-semibold ${categoryColors[memory.category]}`}>
          {categoryLabels[memory.category]}
        </span>
        {showDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete?.(memory.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        )}
      </div>
      <p className="text-foreground mb-4 leading-relaxed">{memory.text}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          {memory.timestamp}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onLike(memory.id)}
          className={`gap-1 ${memory.liked ? "text-red-400" : "text-muted-foreground"}`}
        >
          <Heart className={`w-4 h-4 ${memory.liked ? "fill-current" : ""}`} />
          <span className="text-xs">{memory.likes}</span>
        </Button>
      </div>
    </Card>
  )
}
