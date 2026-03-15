import { ContactForm } from './components/ContactForm';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Get In Touch</h1>
        <p>We'd love to hear from you. Send us a message!</p>
      </header>

      <main className="main">
        <ContactForm />
      </main>

      <footer className="footer">
        <p>Contact us directly at: 9825390005</p>
      </footer>
    </div>
  );
}

export default App;
