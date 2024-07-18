import { HashRouter, Route, Routes } from "react-router-dom";
import Main from "./screen/Main.jsx";
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(outputs);

function App() {
  // const user = {}
  // const signOut = ()=>{}
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <HashRouter>
            <Routes>
              <Route exact path="/" element={<Main data={user} signOut={signOut} level="private" />} />
              <Route exact path="/public" element={<Main data={user} signOut={signOut} level="public" />} />
            </Routes>
          </HashRouter>

        </main>
      )}
    </Authenticator>
  );
}

export default App;
