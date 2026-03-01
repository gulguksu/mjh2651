/**
 * 한글, 영어 소문자, 숫자만 허용.
 * 영어 대문자, 특수문자, 공백 불가.
 */
export const ID_PASSWORD_REGEX = /^[a-z0-9가-힣]+$/

export const ID_PASSWORD_MESSAGE =
  "한글, 영소문자, 숫자만 사용 가능합니다. (대문자·특수문자·공백 불가)"
