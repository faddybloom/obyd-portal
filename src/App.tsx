import { Authenticator } from '@aws-amplify/ui-react';
//import type { Schema } from "../amplify/data/resource";
//import { generateClient } from "aws-amplify/data";


//const client = generateClient<Schema>();

function App() {


return (
    <Authenticator>
      {({ signOut, user }) => {
        if (!user) {
          return <div>Loading...</div>; // or <></> if you prefer silence
        }

        return (
          <div>
            <button onClick={signOut}>Sign out</button>
            <h1>Welcome {user.username}</h1>
          </div>
        );
      }}
    </Authenticator>

  );
}

export default App;
