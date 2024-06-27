
//Components..................
import AddPost from "../../components/addPost/AddPost"
import Stories from "../../components/stories/Stories"
import Feeds from "../../components/feeds/Feeds"

//Fack Apis...................
import CurrentUserData from '../../FackApis/CurrentUserData'

// FontAwesome icon..............
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"



export default function Home() {
    return (
        <>
            <Stories />
            <AddPost />
            <Feeds />
        </>
    )
}