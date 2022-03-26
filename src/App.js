import TasksPage from "./components/pages/tasksPage";
import SideBar from "./components/sideBar";
function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
