import './App.scss';
import '../styles/styles.scss'
import routes from '../routes'
import Header from '../Header/Header';
import { connect } from 'react-redux';
import Welcome from '../Home/Welcome';

function App(props) {

  return (
    <div className="App">
      <Header />
      {
        !(props.id||props.d_id)&&
        <Welcome/>
      }      
      {routes}
    </div>
  );
}

function mapStateToProps(reduxState){
  return reduxState
}

export default connect(mapStateToProps)(App)
