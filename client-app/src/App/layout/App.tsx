import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import agent from "../api/agent";
import LoadingComp from "./LoadingComp";
import { useStore } from "../store/store";
import { observer } from "mobx-react-lite";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const { activityStore } = useStore();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  function deleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities(activities.filter((a) => a.id !== id));
      setSubmitting(false);
    });
  }

  if (activityStore.loadingInitial) return <LoadingComp />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);
