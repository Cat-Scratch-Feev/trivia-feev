import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USER_BY_ID } from '../utils/queries';
import { useParams } from 'react-router-dom';

const Home = ({quizState, setQuizState, handleCategoryChoiceClick}) => {
  //Query for user profile information
    const { profileId } = useParams();
    const { loading, data } = useQuery(
        profileId ? QUERY_USER_BY_ID : QUERY_ME,
        {
          variables: { profileId: profileId },
        }
      );
    const profile = data?.me || data?.profile || {};
  
    if(!profile){
        return <p>no user</p>;
    }
    //Add array of trivia categories
    const triviaCategories = [
      {
        name:"Politics",
        value:"24",
      },
      {
        name:"Art",
        value:"25",
      },
      {
        name: "Geography",
        value:"22",
      },
      {
        name:"Film",
        value:"11",
      },
      {
        name:"Music",
        value:"12",
      },
      {
        name:"TV",
        value:"14",
      },
      {
        name:"Video Games",
        value:"15",
      },
      {
        name:"Books",
        value:"10",
      },
      {
        name:"Theatre",
        value:"13",
      },
      {
        name:"General",
        value:"17",
      },
      {
        name:"Animals",
        value:"27",
      },
      {
        name:"Computers",
        value:"18",
      },
      {
        name:"Sports",
        value:"21",
      },
      {
        name:"Mythology",
        value:"20",
      },
      {
        name:"Vehicles",
        value:"28",
      },
    ];
    // Function to shuffle options
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    //Function to add the correct color class on when rendering the randomized trivia recommendations
    function getCardColor(index) {
      //Create colors array that correspond to styling classes
      const colorPalette = ['blue', 'pink', 'yellow'];
      const colorIndex = index % colorPalette.length;
      return colorPalette[colorIndex];
    }
    const randomCategories= shuffleArray(triviaCategories);

    return (
        <div className="feev__home">
          {loading ? (
            <>test</>
            ) : (
            <div className='home'>
              <section className="welcome__dash--wrap">
              <h1 className="welcome-dash__title">welcome to 
                    <i className="fa-solid fa-cat footer__name--icon"></i>
                    feev<span className="header__name--color">.io</span>!</h1>
                  <div className='greet-bg'>
                    <p className='user-greeting'>{profile.username} </p>
                    <div className="quiz__card--score welcome__dash--score">
                      <i className=" quiz-end__score--icon fa-solid fa-coins"></i>
                      <p className="score__text">{profile.score}</p>
                    </div>
                    
                  </div>
              </section>
              <section className="welcome__recc--wrap">
                <h2 className="trivia__recc--title">trivia recommendations</h2>
                <h3 className="trivia__recc--subtitle">get started with some trivia!</h3>
                <div className='trivia-group'>
                  {randomCategories.slice(0, 3).map((category, index) => (
                    <div className={`trivia-choice-card ${category.value}`} key={index}>
                      <span className={`trivia__card--${getCardColor(index)}`}></span>
                      <button onClick={() => handleCategoryChoiceClick(category.value)}>
                        {category.name}
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          
          )}
        </div>
    );
}
export default Home;