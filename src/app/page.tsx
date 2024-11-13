import RecipesGrid from "./components/RecipesGrid";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className=" m-5">
      <Header></Header>
      <RecipesGrid></RecipesGrid>
    </div >
  );
}
