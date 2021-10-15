import { useCallback, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { v4 as uuid } from "uuid";

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

    const handleSubmit = useCallback((formData: Friend) => {
        if (formData.id) {
            setFriends(friends =>
                friends.map(f => {
                    if (f.id === formData.id) {
                        f = { ...formData };
                    }
                    return f;
                })
            );
            setSelected(undefined);
        } else {
            setFriends(friends => friends.concat({ ...formData, id: uuid() }));
        }
    }, []);

    const updateAccount = useCallback((account: Friend) => {
        setSelected(account);
    }, []);

    const deleteAccount = useCallback((account: Friend) => {
        const { id } = account;
        setFriends(friends => friends.filter(f => f.id !== id));
        setSelected(friend => (friend?.id === id ? undefined : friend));
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
