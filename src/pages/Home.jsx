import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getHomePageData } from '../store/home/homeGet';

// you have to handle the errors
const Home = () => {
    const dispatch = useDispatch()
    const { content, status, error } = useSelector((state) => state.home)
    useEffect(() => {
      dispatch(getHomePageData())
    }, [])
  return (
    <div>
      <h1>
        {content}
      </h1>
    </div>
  );
}

export default Home;
