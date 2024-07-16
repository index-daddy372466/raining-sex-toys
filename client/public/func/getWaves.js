let control = 1.5;
// get wave depending on level
export default function getWaves(level) {
  // level * num
  let res = Math.ceil(level * control)
  return res
}
