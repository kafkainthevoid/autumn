const getNextRoomName = (name: string, range: number = 1) =>
  name.charAt(0) + (+name.substring(1) + range)

export const getSuggestNextRoomName = (name: string, range: number = 1) => {
  let cur: string = getNextRoomName(name)
  let res: string = cur

  if (range < 6) {
    for (let i = 1; i < range; i++) {
      cur = getNextRoomName(cur)
      res += ', ' + cur
    }
  } else {
    res = 'from ' + res + ' to ' + getNextRoomName(cur, range)
  }
  return res
}
