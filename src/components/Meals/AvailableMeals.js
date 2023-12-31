import { useEffect,useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';


const AvailableMeals = () => {
  const [meals,setMeals]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  useEffect(()=>{
    
    const fetchMeals=async()=>{

      const response=await fetch('https://react-http-99a85-default-rtdb.firebaseio.com/meals.json');
      if(!response.ok){
        throw new Error('Something went wrong!!');
      }
      const responseData=await response.json();

      const loadedMeals=[];

      for(const key in responseData){
        loadedMeals.push({
          id:key,
          name:responseData[key].name,
          description:responseData[key].description,
          price:responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setLoading(false);
    };
  

      fetchMeals().catch((error)=>{
        setLoading(false);
        setError(error.message);
      });
  
  },[]);

  if(loading){
    return <section className={classes.loading}>
      <p>Loading...</p>
    </section> 
  }

  if(error)
  {
    return <section className={classes.error}>
      <p>{error}</p>
    </section>
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;