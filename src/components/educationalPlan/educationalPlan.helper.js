function isFirstRow (params) {
  return params.data.section === 'semesters'
}

function isSecondRow (params) {
  return params.data.section === 'modules'
}

function isLectureInfoRow (params) {
  return params.data.section === 'lecturesTime'
}

const cellSemester1ClassRules = {
  'semesters-cell': 'data.section === "semesters"',
  'modules-cell': 'data.section === "modules"'
}

const cellDigitClassRules = {
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

export const SEMESTERS = {
  SEMESTER1: 'semester1',
  SEMESTER2: 'semester2',
  SEMESTER3: 'semester3',
  SEMESTER4: 'semester4',
  SEMESTER5: 'semester5',
  SEMESTER6: 'semester6',
  SEMESTER7: 'semester7',
  SEMESTER8: 'semester8'
}

export const COLUMN = {
  DIGIT: 'digit',
  COURSES: 'courses',
  ...SEMESTERS
}

export const VALUES = Object.values(COLUMN).reduce((p, c) => ({...p, [c]: ''}), {})

export const columnDefs = [
  {
    headerName: 'Թվանիշ',
    field: COLUMN.DIGIT,
    colSpan: digitColSpan,
    cellClassRules: cellDigitClassRules
  },
  {
    headerName: 'Դասընթացներ',
    field: COLUMN.COURSES
  },
  {
    headerName: '1',
    field: COLUMN.SEMESTER1,
    colSpan: semester1ColSpan,
    cellClassRules: cellSemester1ClassRules
  },
  {
    headerName: '2',
    field: COLUMN.SEMESTER2
  },
  {
    headerName: '3',
    field: COLUMN.SEMESTER3
  },
  {
    headerName: '4',
    field: COLUMN.SEMESTER4
  },
  {
    headerName: '5',
    field: COLUMN.SEMESTER5
  },
  {
    headerName: '6',
    field: COLUMN.SEMESTER6
  },
  {
    headerName: '7',
    field: COLUMN.SEMESTER7
  },
  {
    headerName: '8',
    field: COLUMN.SEMESTER8
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
