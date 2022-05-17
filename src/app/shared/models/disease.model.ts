import { SubDisease } from './sub-disease.model';

export class Disease {
  id: number;
  name: string;
  information?: string;
  subDieaseModelView?: SubDisease[];
}
