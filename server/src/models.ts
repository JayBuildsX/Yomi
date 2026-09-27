export interface MangaSummary { id: string; title: string; coverUrl: string | null; latestChapter?: string }
export interface ChapterSummary { id: string; mangaId: string; title: string }
export interface MangaDetails extends MangaSummary { description: string; chapters: ChapterSummary[] }
export interface ChapterPage { index: number; imageUrl: string }
export interface Chapter { id: string; mangaId: string; title: string; pages: ChapterPage[]; previousChapterId?: string; nextChapterId?: string }
export interface MangaSource { getLatest(): Promise<MangaSummary[]>; search(query: string): Promise<MangaSummary[]>; getManga(id: string): Promise<MangaDetails>; getChapter(mangaId: string, id: string): Promise<Chapter> }
