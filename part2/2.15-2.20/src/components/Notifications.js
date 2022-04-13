const Notifications = (props) => {
    if (props.message === null) {
      return null
    }

    if (props.isError === false) {
      return (
        <div className='message'>
            {props.message}
        </div>
      )
    }

    return (
      <div className='error'>
        {props.message}
      </div>
    )
  }

  export default Notifications