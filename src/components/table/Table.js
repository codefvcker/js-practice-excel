import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'
import { $ } from '../../core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mouseup'],
    })
  }

  toHTML() {
    return createTable(35)
  }

  // onClick() {
  //   console.log('onClick')
  // }

  onMousedown(e) {
    if (e.target.dataset.resize) {
      const $resizer = $(e.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords()

      console.log('pd', $parent.data)

      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)

      document.onmousemove = (event) => {
        let delta = null
        let value = null
        if (e.target.dataset.resize === 'col') {
          delta = event.pageX - coords.right
          value = coords.width + delta
          $parent.$el.style.width = value + 'px'
          cells.forEach((cell) => (cell.style.width = value + 'px'))
        } else if (e.target.dataset.resize === 'row') {
          delta = event.pageY - coords.bottom
          value = coords.height + delta
          $parent.$el.style.height = value + 'px'
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }

  // onMousemove() {
  //   console.log('mousemove')
  // }

  onMouseup(e) {
    console.log('ePageX', e.target.pageX)
  }
}

//342 msScripting
// 3031 msRendering
