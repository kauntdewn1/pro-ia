<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
  >
    <span v-if="loading" class="animate-spin mr-2">⟳</span>
    <span v-if="icon" class="mr-2">{{ icon }}</span>
    <slot>{{ text }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  icon?: string
  text?: string
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  const base = 'ios-btn font-semibold transition-all duration-200 flex items-center justify-center'
  
  const variants = {
    primary: 'ios-btn-primary',
    secondary: 'ios-btn-secondary',
    outline: 'ios-btn-outline',
    ghost: 'ios-btn-ghost'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  const width = props.fullWidth ? 'w-full' : ''
  const disabled = props.disabled ? 'opacity-50 cursor-not-allowed' : ''
  
  return `${base} ${variants[props.variant]} ${sizes[props.size]} ${width} ${disabled}`
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>
