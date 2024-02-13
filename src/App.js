import Pages from './Pages/Pages';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {
  return (
   <Router>
      <div>
        <Pages />
      </div>
    </Router>
  );
}

export default App;
