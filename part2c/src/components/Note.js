const Note = ({ note, toggleImportance }) => {
    const label = note.important ? 'Make not important' : 'Make important'
    return (
      <li className="note">
      {note.content}
      <button onClick={() => toggleImportance(note.id)}>{label}</button>
      </li>
    )
  }
  
  export default Note