import PleaseSignin from '../components/PleaseSignin';
// used to limited access to only users who ard signed in.
import Order from '../components/Order';

const OrderPage = (props) => {
  return (
    <PleaseSignin>
      <Order id={props.query.id}/>
    </PleaseSignin>
  )
}

export default OrderPage
