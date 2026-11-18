import workspaceImg from '../assets/images/workspace_after_clean_1795009969461.jpg';
import kitchenImg from '../assets/images/kitchen_after_1794945446390.jpg';
import relaxImg from '../assets/images/how_it_works_relax_1794945446366.jpg';
import glassImg from '../assets/images/glass_after_1794945448175.jpg';

export interface StorySpaceStage {
  id: string;
  imageUrl: string;
}

export const STORY_SPACES: StorySpaceStage[] = [
  {
    id: 'space-workspace',
    imageUrl: workspaceImg,
  },
  {
    id: 'space-kitchen',
    imageUrl: kitchenImg,
  },
  {
    id: 'space-relax',
    imageUrl: relaxImg,
  },
  {
    id: 'space-glass',
    imageUrl: glassImg,
  },
];
