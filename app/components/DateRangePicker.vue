<template>
  <div class="date-range-picker">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Start Date -->
      <div>
        <label class="block text-sm font-medium text-text-secondary mb-2">
          Start Date
        </label>
        <input
          type="datetime-local"
          v-model="localStartDate"
          @change="emitChange"
          :max="localEndDate"
          class="w-full px-4 py-2.5 bg-finance-surface border border-finance-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-text-primary"
        />
      </div>

      <!-- End Date -->
      <div>
        <label class="block text-sm font-medium text-text-secondary mb-2">
          End Date
        </label>
        <input
          type="datetime-local"
          v-model="localEndDate"
          @change="emitChange"
          :min="localStartDate"
          :max="maxDate"
          class="w-full px-4 py-2.5 bg-finance-surface border border-finance-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-text-primary"
        />
      </div>

      <!-- Interval -->
      <div>
        <label class="block text-sm font-medium text-text-secondary mb-2">
          Interval
        </label>
        <select
          v-model="localInterval"
          @change="emitChange"
          class="w-full px-4 py-2.5 bg-finance-surface border border-finance-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-text-primary cursor-pointer"
        >
          <option value="1m">1 Minute</option>
          <option value="5m">5 Minutes</option>
          <option value="15m">15 Minutes</option>
          <option value="30m">30 Minutes</option>
          <option value="1h">1 Hour</option>
          <option value="4h">4 Hours</option>
          <option value="1d">1 Day</option>
          <option value="1w">1 Week</option>
        </select>
      </div>
    </div>

    <!-- Quick Select Buttons -->
    <div class="mt-4 flex flex-wrap gap-2">
      <button
        v-for="preset in presets"
        :key="preset.label"
        @click="applyPreset(preset)"
        class="px-3 py-1.5 text-sm bg-finance-surface border border-finance-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-text-secondary hover:text-primary"
      >
        {{ preset.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface DateRangePreset {
  label: string
  hours?: number
  days?: number
  interval: string
}

const props = defineProps<{
  startDate?: string
  endDate?: string
  interval?: string
}>()

const emit = defineEmits<{
  'update:startDate': [value: string]
  'update:endDate': [value: string]
  'update:interval': [value: string]
  'change': [value: { startDate: string, endDate: string, interval: string }]
}>()

// Local state
const localStartDate = ref(props.startDate || getDefaultStartDate())
const localEndDate = ref(props.endDate || getDefaultEndDate())
const localInterval = ref(props.interval || '5m')

// Max date is now
const maxDate = ref(getDefaultEndDate())

// Quick select presets
const presets: DateRangePreset[] = [
  { label: 'Last 1 Hour', hours: 1, interval: '1m' },
  { label: 'Last 6 Hours', hours: 6, interval: '5m' },
  { label: 'Last 24 Hours', hours: 24, interval: '15m' },
  { label: 'Last 7 Days', days: 7, interval: '1h' },
  { label: 'Last 30 Days', days: 30, interval: '4h' },
]

// Watch for prop changes
watch(() => props.startDate, (val) => {
  if (val) localStartDate.value = val
})

watch(() => props.endDate, (val) => {
  if (val) localEndDate.value = val
})

watch(() => props.interval, (val) => {
  if (val) localInterval.value = val
})

function getDefaultStartDate(): string {
  const date = new Date()
  date.setHours(date.getHours() - 24) // 24 hours ago
  return formatDateTimeLocal(date)
}

function getDefaultEndDate(): string {
  return formatDateTimeLocal(new Date())
}

function formatDateTimeLocal(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

function emitChange() {
  emit('update:startDate', localStartDate.value)
  emit('update:endDate', localEndDate.value)
  emit('update:interval', localInterval.value)
  emit('change', {
    startDate: localStartDate.value,
    endDate: localEndDate.value,
    interval: localInterval.value
  })
}

function applyPreset(preset: DateRangePreset) {
  const end = new Date()
  const start = new Date()
  
  if (preset.hours) {
    start.setHours(end.getHours() - preset.hours)
  } else if (preset.days) {
    start.setDate(end.getDate() - preset.days)
  }
  
  localStartDate.value = formatDateTimeLocal(start)
  localEndDate.value = formatDateTimeLocal(end)
  localInterval.value = preset.interval
  
  emitChange()
}
</script>

<style scoped>
input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  filter: invert(0.5);
  cursor: pointer;
}

input[type="datetime-local"]:hover::-webkit-calendar-picker-indicator {
  filter: invert(0.7);
}
</style>
