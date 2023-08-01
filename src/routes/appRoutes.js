import {Routes, Route} from 'react-router-dom';
import Quiz from '../components/quiz/Quiz';
import NotFound from '../components/notFound/NotFound';

const AppRoutes = () => 
    <Routes>
        <Route path='/' exact element={<Quiz/>}/>
        <Route path='/:404' element={<NotFound/>}/>
    </Routes>

export default AppRoutes;