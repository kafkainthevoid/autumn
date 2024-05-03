export const renderPluralNumber = (num: number, label: string) => {
  if (num === 0) return ''
  return `${num} ${label}${num > 1 ? 's' : ''}`
}
