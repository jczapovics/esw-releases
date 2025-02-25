
export type Period = "month" | "quarter" | "year";

export type ProductQuality = {
  product: string;
  qualityPercentage: number;
  incidents: number;
  trend: "up" | "down";
  change: string;
};

export type ActiveProduct = {
  product: string;
  releases: number;
  change: string;
  trend: "up" | "down";
};

export type Incident = {
  id: string;
  name: string;
  dateReported: Date;
  description: string;
  documentLink: string;
  linkedRelease: {
    id: string;
    name: string;
  };
};

export type Release = {
  id: number;
  businessUnit: string;
  product: string;
  releaseName: string;
  releaseDate: string;
  dri: string;
  releaseNotes: string;
  status: "Deployed";
  quality: "Good" | "Bad";
  description: string;
  incidents: number;
};

export type ActivityItem = {
  id: number;
  title: string;
  product: string;
  releaseName: string;
  description: string;
  date: string;
  type: "release" | "incident";
};
