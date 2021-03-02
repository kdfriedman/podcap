import { BrowserRouter, Route, Switch } from "react-router-dom";
import PodcapApp from "../components/PodcapApp";
import NotFoundPage from "../components/page-components/NotFoundPage";

// initialize react router for handling of app route and any other possible routes
const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      {/* generate route for home page which defaults to podcap app component */}
      <Route path="/" exact component={PodcapApp} />
      {/* handle 400 errors */}
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
