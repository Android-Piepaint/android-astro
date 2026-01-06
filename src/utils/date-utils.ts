//export function formatDateToYYYYMMDD(date: Date): string {
//	return date.toISOString().substring(0, 10);
//}

export function formatDateMinguo(dateInput: string | Date): string {
  const date = new Date(dateInput)

  const year = date.getFullYear() - 1911
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `民國 ${year} 年 ${month} 月 ${day} 日`
}