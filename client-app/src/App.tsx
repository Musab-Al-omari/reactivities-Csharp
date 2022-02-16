import React, { useEffect, useState } from "react";

import axios from "axios";
import { Header, List } from "semantic-ui-react";

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5004/api/activities").then((res) => {
      setActivities(res.data);
    });
  }, []);

  return (
    <div className="App">
      <Header content="Reactivity" as="h2" icon="users" />
      {activities.map((activity: any) => (
        <List.Item key={activity.id}>{activity.title}</List.Item>
      ))}
    </div>
  );
}

export default App;
