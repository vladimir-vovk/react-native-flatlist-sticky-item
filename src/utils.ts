function random(min: number, max: number): number {
  const _min = Math.ceil(min)
  const _max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + _min
}

export function randomColor(): string {
  const r = random(0, 255)
  const g = random(0, 255)
  const b = random(0, 255)
  return `rgb(${r}, ${g}, ${b})`
}
