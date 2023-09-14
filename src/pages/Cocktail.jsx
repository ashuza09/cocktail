import { useLoaderData, Link, Navigate } from "react-router-dom";
import axios from "axios";
import Wrapper from "../assets/wrappers/CocktailPage";
const singleCocktailUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
import { useQuery } from "@tanstack/react-query";

const singleCocktailQuery = (id) =>{
  return{
    queryKey:['cocktail',id],
    queryFn: async () =>{
      const { data } = await axios.get(`${singleCocktailUrl}${id}`);
      return data
    }
  }
}

export const loader =
  (QueryClient) =>
  async ({ params }) => {
    const { id } = params;
    await QueryClient.ensureQueryData(singleCocktailQuery(id))
    return { id };
  };
const Cocktail = () => {
  const { id } = useLoaderData();
  // if(!data) return <h2>Something went wrong...</h2>
  const { data } = useQuery(singleCocktailQuery(id));
  if (!data) return <Navigate to="/" />;
  const singleDrink = data.drinks[0];
  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = singleDrink;

  const validIngredient = Object.keys(singleDrink)
    .filter(
      (key) => key.startsWith("strIngredient") && singleDrink[key] != null
    )
    .map((key) => singleDrink[key]);
  console.log(validIngredient);

  return (
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          Back Home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className="drink">
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
          <p>
            <span className="drink-data">name: </span>
            {name}
          </p>
          <p>
            <span className="drink-data">Category: </span>
            {category}
          </p>
          <p>
            <span className="drink-data">Info: </span>
            {info}
          </p>
          <p>
            <span className="drink-data">Glass: </span>
            {glass}
          </p>

          <p>
            <span className="drink-data"> Ingredients: </span>
            {validIngredient.map((item, index) => {
              return (
                <span key={item}>
                  {item} {index < validIngredient.length - 1 ? "," : ""}
                </span>
              );
            })}
          </p>
          <p>
            <span className="drink-data">Instructions: </span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
export default Cocktail;
