export interface ProfileInterface {
  id: number,
  username: string,
  avatarUrl: string | null,
  subscribersAmount: number,
  firstName: string,
  lastName: string,
  isActive: boolean,
  stack: string | null,
  city: string,
  description: string | null
}
