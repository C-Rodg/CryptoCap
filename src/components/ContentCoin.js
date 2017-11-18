import React from "react";

const ContentCoin = props => {
	console.log(props.match.params.id);
	return (
		<div className="content-coin container">
			<div>Content for /coin/:id here..</div>
		</div>
	);
};

export default ContentCoin;
