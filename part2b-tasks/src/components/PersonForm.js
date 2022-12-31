const PersonForm = ({ handleSubmit, handleChange, newPerson}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input onChange={handleChange} name={'name'} value={newPerson.name}/>
      </div>
      <div>
        number: <input onChange={handleChange} name={'number'} value={newPerson.number}/>
      </div> 
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
