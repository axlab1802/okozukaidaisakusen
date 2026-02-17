export interface LetterData {
  age: string;
  targetItem: string;
  currentAllowance: string;
  episodes: string;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface GeneratedContent {
  text: string;
}
