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

export const VALUES = Object.values(PARAMS).reduce((p, c) => ({...p, [c]: ''}), {})
