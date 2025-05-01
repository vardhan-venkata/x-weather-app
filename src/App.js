import "./App.css";
import Weather from "./Weather";

function App() {
  return (
    <div style={styles.mainContainer}>
      <Weather />
    </div>
  );
}

export default App;

const styles = {
  mainContainer: {
    backgroundColor: "gray",
    height: "100vh",
  },
};
