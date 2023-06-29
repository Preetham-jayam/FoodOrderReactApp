import { useRef,useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {

    const [isvalid,setIsvalid]=useState(true);
   const amountInputRef=useRef();
    const submitHandler=(event)=>{
        event.preventDefault();
        const enteredAmount=amountInputRef.current.value;
        const enteredAmountno=+enteredAmount;
        if(enteredAmount.trim().length===0 || enteredAmountno<1 || enteredAmountno>5){
            setIsvalid(false);
            return;
        }

        props.onAddToCart(enteredAmountno);
    }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!isvalid && <p>Please Enter a valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;