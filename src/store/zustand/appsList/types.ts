export interface IAppMetadata {
  name: string;
  icon: string;
  url: string;
}

export interface IAppsListStore {
  fetching: boolean;
  appsList: IAppMetadata[];
  moreEnabled: boolean;
  moreUrl: string;
  actions: {
    fetchPopularApps: () => void;
  };
}
