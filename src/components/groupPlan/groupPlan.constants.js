export const COLUMN = {
  SUBJECT: 'subject',

  WEEKEND_TIME1: 'weekendTime1',
  LECTURE1: 'lecture1',
  PRACTICAL1: 'practical1',
  EXAMINATION1: 'examination1',
  TESTING1: 'testing1',

  WEEKEND_TIME2: 'weekendTime1',
  LECTURE2: 'lecture1',
  PRACTICAL2: 'practical1',
  EXAMINATION2: 'examination1',
  TESTING2: 'testing1',

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
      field: COLUMN.CHAIR
    }]
  }
]
