<template>
  <svg class="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
    <polyline
      :points="pathPoints"
      fill="none"
      :stroke="strokeColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <linearGradient :id="gradientId" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" :style="`stop-color:${fillColor};stop-opacity:0.3`" />
      <stop offset="100%" :style="`stop-color:${fillColor};stop-opacity:0`" />
    </linearGradient>
    <polygon
      :points="fillPoints"
      :fill="`url(#${gradientId})`"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  symbol: string
  change: number
}>()

// Generate random sparkline data based on symbol (consistent per symbol)
const generateSparklineData = (symbol: string): number[] => {
  const seed = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const data: number[] = []
  let value = 50
  
  for (let i = 0; i < 20; i++) {
    // Use seeded random for consistency
    const random = Math.sin(seed + i) * 10000
    const change = (random - Math.floor(random)) * 20 - 10
    value = Math.max(10, Math.min(90, value + change))
    data.push(value)
  }
  
  // Adjust last point based on actual change
  const lastIndex = data.length - 1
  if (props.change > 0 && data[lastIndex] !== undefined) {
    data[lastIndex] = Math.max(data[lastIndex], 60)
  } else if (props.change < 0 && data[lastIndex] !== undefined) {
    data[lastIndex] = Math.min(data[lastIndex], 40)
  }
  
  return data
}

const sparklineData = computed(() => generateSparklineData(props.symbol))

const pathPoints = computed(() => {
  return sparklineData.value
    .map((value, index) => {
      const x = (index / (sparklineData.value.length - 1)) * 100
      const y = 50 - (value / 100) * 50
      return `${x},${y}`
    })
    .join(' ')
})

const fillPoints = computed(() => {
  const points = sparklineData.value
    .map((value, index) => {
      const x = (index / (sparklineData.value.length - 1)) * 100
      const y = 50 - (value / 100) * 50
      return `${x},${y}`
    })
    .join(' ')
  return `${points} 100,50 0,50`
})

const strokeColor = computed(() => {
  return props.change >= 0 ? '#10B981' : '#EF4444'
})

const fillColor = computed(() => {
  return props.change >= 0 ? '#10B981' : '#EF4444'
})

const gradientId = computed(() => {
  return `gradient-${props.symbol.replace(/[^a-zA-Z0-9]/g, '')}`
})
</script>
