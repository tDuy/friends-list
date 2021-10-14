import { useCallback, useEffect, useState } from "react";
import { Container } from "reactstrap";

import AccountForm from "./Form";
import { FriendsList } from "./Friends";
import "./App.css";
import { Friend } from "./Friends/Friend";

function persistData(friends: Friend[]) {
    window.localStorage.setItem("friends", JSON.stringify(friends));
}

function App() {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [selected, setSelected] = useState<Friend>();

    useEffect(() => {
        const data = JSON.parse(
            window.localStorage.getItem("friends") ?? "null"
        );
        if (data) setFriends(data);

        return () => window.localStorage.removeItem("friends");
    }, []);

    useEffect(() => {
        persistData(friends);
    }, [friends]);

    const handleSubmit = useCallback(
        (formData: Friend) => {
            if (selected) {
                const { name, email, walletAddress } = selected;
                setFriends(friends =>
                    friends.map(f => {
                        if (
                            f.walletAddress === walletAddress &&
                            f.name === name &&
                            f.email === email
                        ) {
                            f = { ...formData };
                        }
                        return f;
                    })
                );
                setSelected(undefined);
            } else {
                setFriends(friends => friends.concat({ ...formData }));
            }
        },
        [selected]
    );

    const updateAccount = useCallback((account: Friend) => {
        setSelected(account);
    }, []);

    const deleteAccount = useCallback((account: Friend) => {
        const { name, email, walletAddress } = account;
        setFriends(friends =>
            friends.filter(
                f =>
                    f.walletAddress !== walletAddress &&
                    f.email !== email &&
                    f.name !== name
            )
        );
    }, []);

    return (
        <div className="App">
            <Container>
                <AccountForm data={selected} onSubmit={handleSubmit} />
                <FriendsList
                    friends={friends}
                    updateAccount={updateAccount}
                    deleteAccount={deleteAccount}
                />
            </Container>
        </div>
    );
}

export default App;
