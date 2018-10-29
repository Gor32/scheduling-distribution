function isFirstRow (params) {
  return params.data.section === 'semesters'
}

function isSecondRow (params) {
  return params.data.section === 'modules'
}

function isLectureInfoRow (params) {
  return params.data.section === 'lecturesTime'
}

let cellSemester1ClassRules = {
  'semesters-cell': 'data.section === "semesters"',
  'modules-cell': 'data.section === "modules"'
}

let cellDigitClassRules = {
  'semesters-cell': 'data.section === "semesters"',
  'modules-cell': 'data.section === "modules"',
  'lecturesTime-cell': 'data.section === "lecturesTime" '
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

function digitColSpan (params) {
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

function semester1ColSpan (params) {
  if (isFirstRow(params)) {
    return 8
  }
  return 1
}

export function getRowHeight (params) {
  return isFirstRow(params) ? 40 : 25
}

export const columnDefs = [
  {
    headerName: 'Թվանիշ',
    field: 'digit',
    colSpan: digitColSpan,
    cellClassRules: cellDigitClassRules
  },
  {
    headerName: 'Դասընթացներ',
    field: 'courses'
  },
  {
    headerName: '1',
    field: 'semester1',
    colSpan: semester1ColSpan,
    cellClassRules: cellSemester1ClassRules
  },
  {
    headerName: '2',
    field: 'semester2'
  },
  {
    headerName: '3',
    field: 'semester3'
  },
  {
    headerName: '4',
    field: 'semester4'
  },
  {
    headerName: '5',
    field: 'semester5'
  },
  {
    headerName: '6',
    field: 'semester6'
  },
  {
    headerName: '7',
    field: 'semester7'
  },
  {
    headerName: '8',
    field: 'semester8'
  }
]

export const rowData = [
  {
    section: 'semesters',
    semester1: 'Կիսամյակներ',
    digit: 'Մոդուլներ / դասընթացներ'
  },
  {
    section: 'modules',
    digit: 'Ընդհանուր կրթության կառուցամաս'
  },
  {
    section: 'lecturesTime',
    digit: 'Լսարանային ժամերը',
    semester1: 0,
    semester2: 0,
    semester3: 0,
    semester4: 0,
    semester5: 0,
    semester6: 0,
    semester7: 0,
    semester8: 0
  }
]
