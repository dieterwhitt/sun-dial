// dieter whittingham
// react frontend
// single webpage

import { Header } from './components/Header';
import { SubscriptionForm } from './components/SubscriptionForm';
import { Footer } from './components/Footer';
import { RenderTimes } from './components/RenderTimes';

function App() {
  return (
    <div className="App">
      <Header/>
      <RenderTimes/>
      <SubscriptionForm/>
      <Footer/>
    </div>
  );
}

export default App;
