import TasksPage from "./components/pages/tasksPage";
import SideBar from "./components/sideBar";
import { useAuth0 } from "@auth0/auth0-react";
import LandingPage from "./components/pages/landingPage";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="App">
      {isAuthenticated ? (
        <div className="container-fluid">
          <div className="row flex-nowrap">
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
              <SideBar />
            </div>
            <div className="col-md-9">
              <TasksPage />
            </div>
          </div>
        </div>
      ) : (
        <LandingPage />
      )}
    </div>
  );
}

export default App;
