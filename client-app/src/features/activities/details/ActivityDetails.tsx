import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComp from "../../../App/layout/LoadingComp";
import { useStore } from "../../../App/store/store";

function ActivityDetails() {
  const { activityStore } = useStore();
  const { selectActivity } = activityStore;
  if (!selectActivity) return <LoadingComp />;
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${selectActivity.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{selectActivity.title}</Card.Header>
        <Card.Meta>
          <span>{selectActivity.date}</span>
        </Card.Meta>
        <Card.Description>{selectActivity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button basic color="blue" content="Edit" />
          <Button basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

export default ActivityDetails;
