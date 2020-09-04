const InputLabel = ( props ) => {
	return (
		<div className="input-label">
			{ props.label }
			{ props.req && <span className="req">*</span> }
		</div>
	);
};
export default InputLabel;
