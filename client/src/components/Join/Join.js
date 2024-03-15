import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Join.css";

function Join() {
	const [user_name, set_user_name] = useState("");
	const [user_room, set_user_room] = useState("");

	return (
		<div className="joinOuterContainer">
			<div className="joinInnerContainer">
				<h1 className="heading">Join</h1>
				<div>
					<input placeholder="Name" className="joinInput" type="text" onChange={(event) => set_user_name(event.target.value)} />
				</div>
				<div>
					<input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => set_user_room(event.target.value)} />
				</div>
				<Link onClick={event => (!user_name || !user_room) ? event.preventDefault() : null} to={`/chat?user_name=${user_name}&user_room=${user_room}`}>
					<button className={"button mt-20"} type="submit">Sign In</button>
				</Link>
			</div>
		</div>
	);
}

export default Join;