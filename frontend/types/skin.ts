export interface Skin {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  unlockType: string;
  unlockValue: number | null;
  relatedStoneType: string | null;
  isDefault: boolean;
  createdAt: string;
}

export interface UserSkin {
  id: string;
  userId: string;
  skinId: string;
  unlockedAt: string;
}
