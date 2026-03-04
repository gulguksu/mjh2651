/** 관리자 계정 아이디. 이 사용자는 비밀번호 없이 글 삭제 가능, 이름에 볼드 적용 */
export const ADMIN_USERNAME = "admin"

export function isAdminUsername(username: string): boolean {
  return username === ADMIN_USERNAME
}
