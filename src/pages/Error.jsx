import Wrapper from "../assets/wrappers/ErrorPage"
import { Link, useRouteError } from "react-router-dom"
import img from '../assets/not-found.svg'
const Error = () => {

    const error = useRouteError()
    console.log(error);
    if(error.status === 404){
        return <Wrapper>
            <div>
                <img src={img} alt="not found 404" />
                <h3>Ohh!</h3>
                <p>We can`t able to find the page you looking for</p>
                <Link to='/'>Back to Home</Link>
            </div>
        </Wrapper>
    }
  return (
    <Wrapper>
        <div>
            <h3>Something went wrong</h3>
        </div>
    </Wrapper>
  )
}
export default Error