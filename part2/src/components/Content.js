const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part}/>)}
        </div>
    )
}

const Part = ({ part }) => <div>{part.name} {part.exercises}</div>
const Total = ({ parts }) => {
    const getNumExercises = () => {
        // USE THE REDUCE FUNCTION TO GET THE SUM OF ALL THE EXERCISES
        return 0;
    }
    return (
        <div>total of {getNumExercises()} exercises</div>
    )
}
export default Content