"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Memory {
  id: string
  text: string
  timestamp: string
  category: "love" | "regrets" | "wisdom" | "final-words" | "other"
  likes: number
  liked: boolean
}

interface MemoryContextType {
  memories: Memory[]
  addMemory: (text: string, category: Memory["category"]) => void
  toggleLike: (id: string) => void
  deleteMemory: (id: string) => void
}

const MemoryContext = createContext<MemoryContextType | undefined>(undefined)

export function MemoryProvider({ children }: { children: ReactNode }) {
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: "1",
      text: "The moments that mattered most were the quiet ones with people I love.",
      timestamp: new Date(Date.now() - 3600000).toLocaleString(),
      category: "love",
      likes: 42,
      liked: false,
    },
    {
      id: "2",
      text: "I wish I had said yes more often. Fear held me back from so much.",
      timestamp: new Date(Date.now() - 7200000).toLocaleString(),
      category: "regrets",
      likes: 28,
      liked: false,
    },
    {
      id: "3",
      text: "The internet was beautiful because it connected us all. Thank you for existing.",
      timestamp: new Date(Date.now() - 10800000).toLocaleString(),
      category: "final-words",
      likes: 156,
      liked: false,
    },
  ])

  const addMemory = (text: string, category: Memory["category"]) => {
    if (text.trim()) {
      setMemories([
        {
          id: Date.now().toString(),
          text,
          timestamp: new Date().toLocaleString(),
          category,
          likes: 0,
          liked: false,
        },
        ...memories,
      ])
    }
  }

  const toggleLike = (id: string) => {
    setMemories(
      memories.map((m) => (m.id === id ? { ...m, liked: !m.liked, likes: m.liked ? m.likes - 1 : m.likes + 1 } : m)),
    )
  }

  const deleteMemory = (id: string) => {
    setMemories(memories.filter((m) => m.id !== id))
  }

  return (
    <MemoryContext.Provider value={{ memories, addMemory, toggleLike, deleteMemory }}>
      {children}
    </MemoryContext.Provider>
  )
}

export function useMemories() {
  const context = useContext(MemoryContext)
  if (!context) {
    throw new Error("useMemories must be used within MemoryProvider")
  }
  return context
}
