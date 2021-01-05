import './App.scss';
import '../styles/styles.scss'
import routes from '../routes'
import Header from '../Header/Header';

export default function App() {

  return (
    <div className="App">
      <Header />
      {routes}
    </div>
  );
}


