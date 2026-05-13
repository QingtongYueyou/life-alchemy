export interface UserProfile {
  id: string;
  nickname: string | null;
  avatarUrl: string | null;
  hp: number;
  currentTitle: string;
  currentSkinId: string;
  createdAt: string;
  updatedAt: string;
}
