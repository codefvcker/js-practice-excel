import { $ } from '../../core/dom'

export function resizeHandler($root, e) {
  const $resizer = $(e.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $resizer.data.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let delta = null
  let value = null

  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px',
  })

  const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)

  document.onmousemove = event => {
    if (type === 'col') {
      delta = event.pageX - coords.right
      value = coords.width + delta
      $resizer.css({
        right: -delta + 'px',
      })
    } else {
      delta = event.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({ bottom: -delta + 'px' })
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    if (type === 'col') {
      $parent.css({ width: value + 'px' })
      cells.forEach(cell => (cell.style.width = value + 'px'))
    } else {
      $parent.css({ height: value + 'px' })
    }
    $resizer.css({
      opacity: 0,
      right: 0,
      bottom: 0,
    })
    delta = null
    value = null
  }
}
