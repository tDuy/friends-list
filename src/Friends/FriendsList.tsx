import { Row, Col } from "reactstrap";
import { Friend } from "./Friend";
import FriendCard from "./FriendCard";
import "./FriendsList.css";

type Props = Readonly<{
    friends: Friend[];
    updateAccount: (data: Friend) => void;
    deleteAccount: (data: Friend) => void;
}>;

export default function FriendsList(props: Props) {
    return (
        <div className="FriendsList__container">
            <p className="text-start">Friends</p>
            <Row>
                {props.friends.map((account, index) => (
                    <Col sm={6} key={index}>
                        <FriendCard
                            account={account}
                            updateAccount={props.updateAccount}
                            deleteAccount={props.deleteAccount}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
}
