import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";
export default class ActivityStore {
  selectActivity: Activity | undefined;
  activityRegistry = new Map<string, Activity>();
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get activityByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  loadActivities = async () => {
    try {
      const activities = await agent.Activities.list();

      activities.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        this.activityRegistry.set(activity.id, activity);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (value: boolean) => {
    this.loadingInitial = value;
  };
  selectedActivity = (id: string) => {
    this.selectActivity = this.activityRegistry.get(id);
  };

  cancelSelectedActivity = () => {
    this.selectActivity = undefined;
  };
  openForm = (id?: string) => {
    id ? this.selectedActivity(id) : this.cancelSelectedActivity();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createActivity = async (activity: Activity) => {
    this.setLoading(true);
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      this.activityRegistry.set(activity.id, activity);
      this.closeForm();
      this.setLoading(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };

  setLoading = (value: boolean) => {
    this.loading = value;
  };

  updateActivity = async (activity: Activity) => {
    this.setLoading(true);
    try {
      await agent.Activities.update(activity);
      this.activityRegistry.set(activity.id, activity);
      this.selectedActivity(activity.id);
      this.setLoading(false);
      this.closeForm();
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };

  deleteActivity = async (id: string) => {
    this.setLoading(true);
    try {
      await agent.Activities.delete(id);
      this.activityRegistry.delete(id);
      if (this.selectActivity?.id === id) {
        this.cancelSelectedActivity();
      }

      this.setLoading(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };
}
