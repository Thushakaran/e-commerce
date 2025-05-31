import {Helmet} from "react-helemt-async"

export default function MetaData({title}){
    return (
        <Helmet>
            <title>{`${title}`}</title>
        </Helmet>
    )
}