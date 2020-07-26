import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'
import { $ } from '../../core/dom'
import { resizeHandler } from './table.resize'
import { shouldResize } from './table.functions'

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
    e.preventDefault()
    if (shouldResize(e)) {
      resizeHandler(this.$root, e)
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
