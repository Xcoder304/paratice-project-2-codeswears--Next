import Main from "../components/Main/Main";
import { selectItems } from "../Redux/features/AllGlobalStates";
import { useSelector } from "react-redux";

const Home = () => {
  const items = useSelector(selectItems);

  console.log("this is items", items);

  return (
    <div className="app">
      <Main />
    </div>
  );
};

export default Home;
