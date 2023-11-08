import {  Routes, Route } from 'react-router-dom';
import Error from './Error'

import Article from './article/Article';

import allNewsList from '../../websiteContent/AllNews';
import TenArticle from './article/TenArticle';

function Main(props) {
 
  const paragrafChecking = (data)=>{
    let newTe = ''
    data.forEach(data=>{
        newTe = newTe+ ' ' + data.context.toLowerCase()
    })
    return newTe.includes(props.searchValue)
}

const fittingArticle = allNewsList.filter(data=>paragrafChecking(data));

  const createSingleNewsRoute = (data)=>{
    return <Route key={data[0].context} path={data[0].context} element={<Article data={data}/>} />
}
  const createTenArticleRouts = (pathName, contextArray)=>{
    const tenArticleList = [];
    let count = Math.ceil( contextArray.length / 10 + 1 );
    for(let i = 0 ; i < count ; i++ ){
      tenArticleList.push( <Route key='' path={`/${pathName+i}`} element={ <TenArticle pathName={pathName} suppageListCount={count} tenArticle={contextArray.slice(i*10-10 , i*10 > contextArray.length ?  contextArray.length  : i+9)}/>} />)
     }
     return tenArticleList
 }

    return (
      <main className={props.ver}>
        <Routes>
            {createTenArticleRouts('News', allNewsList).map(route=>route)}
            {createTenArticleRouts('Szukaj', fittingArticle).map(route=>route)}

            <Route path='/' element={<TenArticle pathName={'News'} suppageListCount={Math.ceil(allNewsList.length / 10 + 1 )} tenArticle={allNewsList.slice(0, 10)}/>} />
            <Route path='/STApp' element={<TenArticle pathName={'News'} suppageListCount={Math.ceil(allNewsList.length / 10 + 1 )} tenArticle={allNewsList.slice(0, 10)}/>} />
            {allNewsList.map(data=>createSingleNewsRoute(data))}


            <Route path='*' element={<Error/>} />
        </Routes>

      </main>
    );
  }
    
  export default Main;