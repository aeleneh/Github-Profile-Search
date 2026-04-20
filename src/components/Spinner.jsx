import { ClipLoader } from "react-spinners";

function Spinner({ size = 35, color = "#3b82f6"}) {
    return (
        <ClipLoader size={size} color={color}/>
    );
}

export default Spinner;