import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardText,
    CardTitle,
} from "reactstrap";
import { Friend } from "./Friend";

type Props = Readonly<{
    account: Friend;
    updateAccount: (data: Friend) => void;
    deleteAccount: (data: Friend) => void;
}>;

export default function FriendCard({
    account,
    updateAccount,
    deleteAccount,
}: Props) {
    const { name, email, walletAddress } = account;

    return (
        <Card className="text-start">
            <CardHeader>{name}</CardHeader>
            <CardBody>
                <CardTitle tag="h5">{email}</CardTitle>
                <CardText>{walletAddress}</CardText>
                <Button color="primary" onClick={() => updateAccount(account)}>
                    Update
                </Button>
                <Button
                    color="danger"
                    outline
                    onClick={() => deleteAccount(account)}
                >
                    Delete
                </Button>
            </CardBody>
        </Card>
    );
}
