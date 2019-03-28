export const COLUMN = {
  SUBJECT_NAME: 'subjectName',
  SUBJECT_ID: 'subjectId',
  GROUP: 'group',

  NUMBER_OF_STUDENTS: 'numberOfStudents',
  LECTURE: 'lecture',
  PRACTICAL: 'practical',
  LAB: 'lab',
  CONSULTATION: 'consultation',
  TESTING: 'testing',
  EXAMINATION: 'examination',
  PRACTICE: 'practice',
  COURSE_WORK: 'courseWork',
  DIPLOMA: 'diploma',
  TOTAL_SEMESTER: 'totalSemester',
  TOTAL: 'total'
}

export const columnDefs = [
  {
    headerName: '',
    children: [{
      headerName: 'Առարկանների անուները',
      field: COLUMN.SUBJECT_NAME,
      width: 500,
      enableRowGroup: true
    }]
  },
  {
    headerName: '',
    children: [
      {
        headerName: 'Խումբ',
        field: COLUMN.GROUP,
        enableRowGroup: true
      }]
  },
  {
    headerName: '',
    children: [
      {
        headerName: 'Ուսանողների թիվ',
        field: COLUMN.NUMBER_OF_STUDENTS
      }]
  },
  {
    headerName: 'Ժամաքանակները ըստ ուսումնական բաղադրիչների',
    children: [
      {
        headerName: 'Դասախոսություն',
        field: COLUMN.LECTURE
      },
      {
        headerName: 'Գործնական',
        field: COLUMN.PRACTICAL
      },
      {
        headerName: 'Լաբորատոր',
        field: COLUMN.LAB
      },
      {
        headerName: 'Կոնսուլտացիա',
        field: COLUMN.CONSULTATION
      },
      {
        headerName: 'Ստուգարք',
        field: COLUMN.TESTING
      },
      {
        headerName: 'Քննություն',
        field: COLUMN.EXAMINATION
      },
      {
        headerName: 'Պրակտիկա',
        field: COLUMN.PRACTICE
      },
      {
        headerName: 'Կուրսային աշխատանք/նախագիծ',
        field: COLUMN.COURSE_WORK
      },
      {
        headerName: 'Դիպլոմային',
        field: COLUMN.DIPLOMA
      },
      // {
      //   headerName: 'Ընդհանուր կիսամյակով',
      //   field: COLUMN.TOTAL_SEMESTER
      // },
      {
        headerName: 'Ընդհանուր',
        field: COLUMN.TOTAL
      }

    ]
  }
]

export const WEEK_OF_EDUCATIONAL = 16
export const WEEK_MANUFACTURER = 1
