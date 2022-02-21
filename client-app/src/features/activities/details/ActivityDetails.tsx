import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../App/models/activity";

interface Props {
  activity: Activity;
  handleCancelSelectedActivity: () => void;
  handleFormOpen: (id?: string) => void;
}
function ActivityDetails({ activity, handleCancelSelectedActivity,handleFormOpen }: Props) {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button onClick={handleFormOpen.bind(null,activity.id)} basic color="blue" content="Edit" />
          <Button
            onClick={handleCancelSelectedActivity}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

export default ActivityDetails;
