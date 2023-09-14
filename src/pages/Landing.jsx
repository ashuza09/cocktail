import axios from "axios";
import { useLoaderData } from "react-router-dom";
import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";
import { QueryClient, useQuery } from "@tanstack/react-query";



const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const searchCocktailQuery = (searchTerm) =>{
  return{
    queryKey:['search',searchTerm || 'all'],
    queryFn: async () =>{
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
      
      return response.data.drinks
    }
  }
}

export const loader = (QueryClient ) => async ({request}) => {
  const url = new URL(request.url)
  const searchTerm = url.searchParams.get('search') || " ";
  await QueryClient.ensureQueryData(searchCocktailQuery(searchTerm))
  //const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
  

  return { searchTerm}
};

const Landing = () => {
  const { searchTerm} = useLoaderData();
  const {data:drinks} = useQuery(searchCocktailQuery(searchTerm))
  console.log(drinks);
  return <>
    <SearchForm searchTerm={searchTerm} />
    <CocktailList drinks={drinks} />
  </>;
};
export default Landing;
