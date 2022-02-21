import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../App/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  handleSelectedActivity: (id: string) => void;
  handleCancelSelectedActivity: () => void;
  editMode: boolean;
  handleFormOpen: (id?: string) => void;
  handleFormClose: () => void;
  createOrEditActivity: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
}

export const ActivityDashboard = ({
  activities,
  selectedActivity,
  handleSelectedActivity,
  handleCancelSelectedActivity,
  handleFormOpen,
  editMode,
  handleFormClose,
  createOrEditActivity,
  deleteActivity
}: Props) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          handleSelectedActivity={handleSelectedActivity}
          deleteActivity={deleteActivity}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity &&!editMode&& (
          <ActivityDetails
            activity={selectedActivity}
            handleCancelSelectedActivity={handleCancelSelectedActivity}
            handleFormOpen={handleFormOpen}
          />
        )}
        {editMode && (
          <ActivityForm handleFormClose={handleFormClose} activity={selectedActivity} createOrEditActivity={createOrEditActivity} />
        )}
      </Grid.Column>
    </Grid>
  );
};
