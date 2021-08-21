import keyMirror from 'keymirror'

export const USER_ROLES = keyMirror({
  ADMIN: null,
  USER: null
})

export const USER_STATUS = keyMirror({
  VERIFIED: null,
  NOT_VERIFIED: null,
  DISABLED: null
})

export const TEST_STATUS = keyMirror({
  STARTED: null,
  COMPLETED: null
})

export const QUESTION_TYPES = keyMirror({
  MULTIPLE: null,
  SINGLE: null
})
