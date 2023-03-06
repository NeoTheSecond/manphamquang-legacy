export interface EducationType {
  id: string;
  title: string;
  duration: string;
  location: string;
  cover_image: {
    publicUrl: string;
  };
}

export interface ExperienceType {
  id: string;
  title: string;
  duration: string;
  location: string;
  type: string;
  description: string;
  technologies: Array<TechnologyType>;
  cover_image: {
    publicUrl: string;
  };
}

export interface TechnologyType {
  name: string;
  id: string;
}

export interface PostType {
  id: string;
  title: string;
  postedOn: string;
  tags: [{ id: string; name: string }];
  slug: string;
  status: PostStatus.DRAFT | PostStatus.PUBLISHED;
}

export enum PostStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
}
