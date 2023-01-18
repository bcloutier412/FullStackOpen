const Notification = ({ successMessage, errorMessage }) => {
    const sucessMessageStyles = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
        width: 'max-content',
    }

    const errorMessageStyles = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
        width: 'max-content',
    }

  if (successMessage) {
    return <div style={sucessMessageStyles}>{successMessage}</div>;
  } else if (errorMessage) {
    return <div style={errorMessageStyles}>{errorMessage}</div>;
  }

  return null;
};

export default Notification;
