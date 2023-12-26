import logo from './logo.svg';
import './App.css';
import FeedbackForm from './FeedbackForm';
import DeliveryForm from './DeliveryForm';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return (
        <div className="App">
            <FeedbackForm></FeedbackForm>
            <DeliveryForm></DeliveryForm>
        </div>
    );
}

export default App;
