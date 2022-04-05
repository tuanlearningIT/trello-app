import AppBar from "./component/AppBar/AppBar";
import BoardBar from "./component/BoardBar/BoardBar";
import BoardContent from "./component/BoardContent/BoardContent";



function App() {
  return (
    <div className="trello-app-master">
      <AppBar />
      <BoardBar />
      <BoardContent />
    </div>
  );
}

export default App;
