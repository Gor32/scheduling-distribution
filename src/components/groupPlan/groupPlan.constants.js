export const COLUMN = {
  SUBJECT: 'subject',

  WEEKEND_TIME1: 'weekendTime1',
  LECTURE1: 'lecture1',
  PRACTICAL1: 'practical1',
  LAB1: 'lab1',
  EXAMINATION1: 'examination1',
  TESTING1: 'testing1',
  COURSE1: 'course1',

  WEEKEND_TIME2: 'weekendTime2',
  LECTURE2: 'lecture2',
  PRACTICAL2: 'practical2',
  LAB2: 'lab2',
  EXAMINATION2: 'examination2',
  TESTING2: 'testing2',
  COURSE2: 'course2',

  CHAIR: 'chair'
}

export const columnDefs = [
  {
    headerName: '',
    children: [{
      headerName: 'առարկա',
      field: COLUMN.SUBJECT,
      width: 1000
    }]
  },
  {
    headerName: '1-ին կիսամյակ',
    children: [
      {
        headerName: 'շ.ժ.',
        field: COLUMN.WEEKEND_TIME1
      },
      {
        headerName: 'դաս',
        field: COLUMN.LECTURE1
      },
      {
        headerName: 'գործ',
        field: COLUMN.PRACTICAL1
      },
      {
        headerName: 'լաբ',
        field: COLUMN.LAB1
      },
      {
        headerName: 'կուր',
        field: COLUMN.COURSE1
      },
      {
        headerName: 'քնն',
        field: COLUMN.EXAMINATION1
      },
      {
        headerName: 'ստ',
        field: COLUMN.TESTING1
      }
    ]
  },
  {
    headerName: '2-րդ կիսամյակ',
    children: [
      {
        headerName: 'շ.ժ.',
        field: COLUMN.WEEKEND_TIME2
      },
      {
        headerName: 'դաս',
        field: COLUMN.LECTURE2
      },
      {
        headerName: 'գործ',
        field: COLUMN.PRACTICAL2
      },
      {
        headerName: 'լաբ',
        field: COLUMN.LAB2
      },
      {
        headerName: 'կուր',
        field: COLUMN.COURSE2
      },
      {
        headerName: 'քնն',
        field: COLUMN.EXAMINATION2
      },
      {
        headerName: 'ստ',
        field: COLUMN.TESTING2
      }
    ]
  },
  {
    headerName: '',
    children: [{
      headerName: 'ամբիոն',
      width: 250,
      field: COLUMN.CHAIR
    }]
  }
]

export const VALUES = Object.values(COLUMN).reduce((p, c) => ({...p, [c]: ''}), {})
