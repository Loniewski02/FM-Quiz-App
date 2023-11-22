type Props = {
	points: number;
};

const Result: React.FC<Props> = (props) => {
	return <h2>{props.points} out of 10</h2>;
};

export default Result;
