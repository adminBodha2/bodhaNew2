// Export types for use in components

export interface Dhatu {
  id: string
  root: string
  meaning: string
  level: number
  derivations?: string[]
  civilizationInsight?: string
}

export interface Prefix {
  id: string
  label: string
  display: string
}

export interface Recipe {
  name: string
  derivation: string
  meaning: string
  civ: string
}

export interface PrefixOption extends Prefix {
  key: string
  hasRecipe: boolean
  alreadyCrafted: boolean
}

export interface LogEntry {
  recipe: Recipe
  key: string
}

export interface SaveData {
  level: number
  crafted: string[]
  totalCrafted: number
  logEntries: LogEntry[]
}

export interface ForgeConfig {
  title: string
  subtitle: string
  levels: {
    thresholds: number[]
    labels: string[]
  }
  dhatus: Dhatu[]
  prefixes: Prefix[]
  recipes: Record<string, Recipe>
}
