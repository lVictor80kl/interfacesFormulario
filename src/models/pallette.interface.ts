interface File {
    name: string;
    path: string;
    size: number;
    type: 'application/x-font-ttf';
  }

export interface Pallette {
    id: number;
    colors: string[]
    sizes: string[]
    typo1: File;
    typo2: File;     
    userId: number;
  }