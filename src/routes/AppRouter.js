import { BrowserRouter, Route, Switch } from "react-router-dom";
import BuilderPage from "../components/PageComponents/BuilderPage";
import NotFoundPage from "../components/PageComponents/NotFoundPage";

// initialize react router for handling of app route and any other possible routes
const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      {/* generate route for home page which defaults to podcap app component */}
      <Route path="/" exact component={BuilderPage} />
      {/* handle 400 errors */}
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
