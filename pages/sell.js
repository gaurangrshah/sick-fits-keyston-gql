import CreateItem from '../components/CreateItem';
import PleaseSignin from '../components/PleaseSignin';
// used to limited access to only users who ard signed in.

const Sell = () => {
  return (
    <PleaseSignin>
      {/* wrapping createItem with pleaseSignin, makes created item a gated component */}
      <CreateItem />
    </PleaseSignin>
  )
}

export default Sell
