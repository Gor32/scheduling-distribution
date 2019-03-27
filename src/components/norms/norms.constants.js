export const PARAMS = {
  EXAMINATION: 'examination',
  TESTING: 'testing',
  CONSULTATION_EXAMINATION: 'consultationExamination',
  CONSULTATION_TESTING: 'consultationTesting',
  COURSE_WORK: 'courseWork',
  COURSE_PROJECT: 'courseProject',
  PRACTICE: 'practice',
  LAB: 'lab',
  PRACTICAL: 'practical',
  DIPLOMA: 'diploma'
}

export const INPUT_PRAMS = {
  EXAMINATION: {
    inputKey: PARAMS.EXAMINATION,
    title: '',
    placeholder: 'գործակից',
    paramValue: 'Քննություն',
  },
  TESTING: {
    inputKey: PARAMS.TESTING,
    title: '',
    placeholder: 'գործակից',
    paramValue: 'Ստուգարք'
  },
  CONSULTATION_EXAMINATION: {
    inputKey: PARAMS.CONSULTATION_EXAMINATION,
    title: '',
    placeholder: 'արժեք',
    paramValue: 'Կոնսուլտացիա քննություն'
  },
  CONSULTATION_TESTING: {
    inputKey: PARAMS.CONSULTATION_TESTING,
    title: '',
    placeholder: 'արժեք',
    paramValue: 'Կոնսուլտացիա ստուգարք'
  },
  COURSE_WORK: {
    inputKey: PARAMS.COURSE_WORK,
    title: '',
    placeholder: 'արժեք',
    paramValue: 'Կուրսային աշխատանք'
  },
  COURSE_PROJECT: {
    inputKey: PARAMS.COURSE_PROJECT,
    title: '',
    placeholder: 'արժեք',
    paramValue: 'Կուրսային նախագծում'
  },
  PRACTICE: {
    inputKey: PARAMS.PRACTICE,
    title: '',
    placeholder: 'շաբաթական քանի ժամ',
    paramValue: 'Պրակտիկա'
  },
  LAB: {
    inputKey: PARAMS.LAB,
    title: '',
    placeholder: 'ուսանողների քանակ',
    paramValue: 'Լաբեր'
  },
  PRACTICAL: {
    inputKey: PARAMS.PRACTICAL,
    title: '',
    placeholder: 'ուսանողների քանակ',
    paramValue: 'Գործնական'
  },
  DIPLOMA: {
    inputKey: PARAMS.DIPLOMA,
    title: '',
    placeholder: 'մեկ ուսանողին հասնող ժսմերը',
    paramValue: 'Դիպլոմային'
  }
}

export const VALUES = Object.values(PARAMS).reduce((p, c) => ({...p, [c]: ''}), {})
