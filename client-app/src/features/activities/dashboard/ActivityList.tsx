import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../App/models/activity";

interface Props {
  activities: Activity[];
  handleSelectedActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
}
const ActivityList = ({ activities, handleSelectedActivity ,deleteActivity}: Props) => {
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.venue},{activity.city}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={handleSelectedActivity.bind(null, activity.id)}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  onClick={deleteActivity.bind(null, activity.id)}
                  floated="right"
                  content="delete"
                  color="red"
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default ActivityList;
