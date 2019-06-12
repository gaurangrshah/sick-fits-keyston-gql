import Reset from '../components/Reset';

const reset = props => {
  return (
    <>
      <p>reset your password</p>
      <Reset resetToken={props.query.resetToken} />
    </>
  )
}

export default reset
