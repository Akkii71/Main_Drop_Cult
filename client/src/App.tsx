import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <Outlet />
      </main>
      <Chatbot />
      <Footer />
    </>
  );
}

export default App;
