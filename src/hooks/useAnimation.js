import { useState, useEffect, useCallback } from 'react'

export function useAnimation() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationType, setAnimationType] = useState('bounce')
  const [autoPlay, setAutoPlay] = useState(false)
  const [speed, setSpeed] = useState(1)

  const animationTypes = [
    { id: 'bounce', name: '통통 튀기', duration: 1000 },
    { id: 'wiggle', name: '좌우 흔들기', duration: 800 },
    { id: 'spin', name: '빙글빙글', duration: 2000 },
    { id: 'dance', name: '댄스 파티', duration: 1500 }
  ]

  const toggleAnimation = useCallback(() => {
    setIsAnimating(prev => !prev)
  }, [])

  const changeAnimationType = useCallback((type) => {
    setAnimationType(type)
    setIsAnimating(true)
  }, [])

  const toggleAutoPlay = useCallback(() => {
    setAutoPlay(prev => !prev)
  }, [])

  const changeSpeed = useCallback((newSpeed) => {
    setSpeed(newSpeed)
  }, [])

  useEffect(() => {
    if (!autoPlay) return

    const currentAnimation = animationTypes.find(anim => anim.id === animationType)
    const duration = (currentAnimation?.duration || 1000) / speed

    const interval = setInterval(() => {
      const currentIndex = animationTypes.findIndex(anim => anim.id === animationType)
      const nextIndex = (currentIndex + 1) % animationTypes.length
      setAnimationType(animationTypes[nextIndex].id)
    }, duration + 500)

    return () => clearInterval(interval)
  }, [autoPlay, animationType, speed, animationTypes])

  useEffect(() => {
    if (autoPlay) {
      setIsAnimating(true)
    }
  }, [autoPlay])

  return {
    isAnimating,
    animationType,
    autoPlay,
    speed,
    animationTypes,
    toggleAnimation,
    changeAnimationType,
    toggleAutoPlay,
    changeSpeed
  }
}