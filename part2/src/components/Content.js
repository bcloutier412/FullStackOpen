const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part}/>)}
            <b><Total parts={parts}/></b>
        </div>
    )
}

const Part = ({ part }) => <div>{part.name} {part.exercises}</div>;

const Total = ({ parts }) => {

    const totalExercises = parts.reduce((sum, part) => part.exercises + sum, 0);

    return (
        <div>total of {totalExercises} exercises</div>
    );
}

export default Content