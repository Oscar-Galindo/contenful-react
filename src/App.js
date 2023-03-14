import Hero from "./components/Hero/Hero";
import FeaturedTitle from "./components/FeaturedTitle/FeaturedTitle";
import KeyboardNavigation from "./components/KeyboardNavigation/KeyboardNavigation";
import ValueProposition from "./components/ValueProposition/ValueProposition";

function App() {
  return (
    <div className="App">
      <KeyboardNavigation />
      <Hero />
      <ValueProposition />
      <FeaturedTitle />
    </div>
  );
}

export default App;
