import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import LoadingComp from "./LoadingComp";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    agent.Activities.list().then((response) => {
      let activities: Activity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      });
      setActivities(activities);
      setLoading(false)

    });
    // axios.get<Activity[]>("http://localhost:5004/api/activities").then((res) => {
    //   setActivities(res.data);
    // });
  }, []);

  function handleSelectedActivity(id: string) {
    setSelectedActivity(activities.find((a) => a.id === id));
  }

  function handleCancelSelectedActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectedActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function deleteActivity(id: string) {
    setActivities(activities.filter((a) => a.id !== id));
  }

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id
      ? setActivities([...activities.filter((a) => a.id !== activity.id), activity])
      : setActivities([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  }


  if (loading)return <LoadingComp/>
  return (
    <>
      <NavBar handleFormOpen={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          handleSelectedActivity={handleSelectedActivity}
          handleCancelSelectedActivity={handleCancelSelectedActivity}
          handleFormOpen={handleFormOpen}
          editMode={editMode}
          handleFormClose={handleFormClose}
          createOrEditActivity={handleCreateOrEditActivity}
          deleteActivity={deleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
