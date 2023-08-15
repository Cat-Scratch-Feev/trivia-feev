import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USER_BY_ID } from '../utils/queries';
import { useParams } from 'react-router-dom';

const Home = () => {
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
    return (
        <div className="feev__home">
         <div className='greet-bg'>

                <p className='user-greeting'>Welcome, User! </p>
                <p className='score'>Score: 1200 Points
                 

                    <i className=" fa-solid fa-coins">
                    
                    </i> 
                
                </p>

          <p>.</p>
            {loading ? (
            <>test</>
            ) : (
            <p>{profile.username}</p>
          )}
            </div>
        </div>
    );
}
export default Home;