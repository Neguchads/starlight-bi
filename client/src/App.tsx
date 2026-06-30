/**
 * Starlight BI - Main App Component
 * Futurismo Minimalista: Glassmorphism + Neon Accents
 */

import { Route, Switch } from "wouter";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import Docs from "@/pages/Docs";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/docs" component={Docs} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
