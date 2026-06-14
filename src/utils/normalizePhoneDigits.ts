export function formatIsdnForDisplay(isdn: string): string {
  const digits = isdn.replace(/\D/g, '')

  if (digits.startsWith('959')) {
    return `0${digits.slice(2)}`
  }

  if (digits.startsWith('09')) {
    return digits
  }

  return `09${digits.slice(-9)}`
}

export function normalizePhoneDigits(phone: string | number): string {
  const digits = String(phone).replace(/\D/g, '')

  if (digits.startsWith('959')) {
    return digits.slice(3).slice(-9)
  }

  if (digits.startsWith('09')) {
    return digits.slice(2).slice(-9)
  }

  return digits.slice(-9)
}
