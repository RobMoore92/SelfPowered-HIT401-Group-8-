import {useHistory} from "react-router-dom";

export default () => {
    const history = useHistory();
    const clientDetails = history.location.state;
    return (
        <div className="flex flex-grow flex-col justify-between h-full">

        </div>
    );
};
