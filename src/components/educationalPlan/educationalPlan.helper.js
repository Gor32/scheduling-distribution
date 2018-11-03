 function isFirstRow (params) {
  return params.data.section === 'semesters'
}

function isSecondRow (params) {
  return params.data.section === 'modules'
}

function isLectureInfoRow (params) {
  return params.data.section === 'lecturesTime'
}

export function printResult (res) {
  console.log('---------------------------------------')
  if (res.add) {
    res.add.forEach((rowNode) => {
      console.log('Added Row Node', rowNode)
    })
  }
  if (res.remove) {
    res.remove.forEach((rowNode) => {
      console.log('Removed Row Node', rowNode)
    })
  }
  if (res.update) {
    res.update.forEach((rowNode) => {
      console.log('Updated Row Node', rowNode)
    })
  }

}

export function digitColSpan (params) {
  if (isFirstRow(params)) {
    return 2
  }
  else if (isSecondRow(params)) {
    return 10
  }
  else if (isLectureInfoRow(params)) {
    return 2
  }
  return 1
}

export function semester1ColSpan (params) {
  if (isFirstRow(params)) {
    return 8
  }
  return 1
}

export function getRowHeight (params) {
  return isFirstRow(params) ? 40 : 25
}

export function calculateSemesters (semester, newItem, column) {
  if (semester == null) return 0
  const lecValues = semester.slice()
  let resSem = 0
  for (let i of lecValues.split(':')) {
    if (i === 'Q') {
      newItem.exam.push(column)
      continue
    }
    resSem += Number(i) || 0
  }
  return resSem
}
