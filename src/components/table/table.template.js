const CODES = {
  A: 65,
  Z: 90,
}

function createCol(content, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${content}
      <div class="col-resize" data-resize="col"></div>
    </div>
    `
}

function createRow(rowCount, content) {
  const resizer = rowCount
    ? `<div class="row-resize" data-resize="row"></div>`
    : ''
  return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${rowCount}
                ${resizer}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function createCell(_, col) {
  console.log(col)
  return `
    <div class="cell" contenteditable data-col="${col}"></div>
    `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount).fill('').map(toChar).map(createCol).join('')
  const cellsInRow = new Array(colsCount).fill('').map(createCell).join('')

  // Alternative way. Do this and move to letters from code and join after or in the function

  //    for(let j=0; j<=colsCount;j++) {
  //     cols.push(createCol(CODES.A + j))
  //    }

  rows.push(createRow('', cols))

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i + 1, cellsInRow))
  }

  return rows.join('')
}
