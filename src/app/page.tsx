import RecipesGrid from "./components/RecipesGrid";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className=" text-5xl m-5">
      <Header></Header>
      <RecipesGrid></RecipesGrid>
    </div >
  );
}
