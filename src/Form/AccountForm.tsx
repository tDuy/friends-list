import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import { Button, Form, FormGroup } from "reactstrap";
import web3 from "web3";

import { Friend } from "../Friends/Friend";
import { validateEmail } from "../Utils";
import "./AccountForm.css";

type Props = Readonly<{
    data?: Friend;
    onSubmit: (data: Friend) => void;
}>;

const DEFAULT_STATE: Friend = { name: "", email: "", walletAddress: "" };

type ErrorState = {
    name: boolean;
    email: boolean;
    walletAddress: boolean;
};
function getErrorState({ name, email, walletAddress }: Friend): ErrorState {
    return {
        name: !Boolean(name),
        email: !validateEmail(email),
        walletAddress: !web3.utils.isAddress(walletAddress),
    };
}

export default function AccountForm(props: Props) {
    const [state, setState] = useState<Friend>({ ...DEFAULT_STATE });
    const [hasError, setHasError] = useState<ErrorState>({
        name: false,
        email: false,
        walletAddress: false,
    });

    useEffect(() => {
        const { name = "", email = "", walletAddress = "" } = props.data ?? {};
        setState({ name, email, walletAddress });
    }, [props.data]);

    const handleChange = useCallback(event => {
        const { target } = event;
        setState(state => ({ ...state, [target.name]: target.value }));
    }, []);

    const submitForm = useCallback(() => {
        const data = {
            name: state.name?.trim(),
            email: state.email?.trim(),
            walletAddress: state.walletAddress?.trim(),
        };
        const error = getErrorState(data);
        setHasError(error);
        if (error.email || error.name || error.walletAddress) {
            return;
        }
        const save = props.onSubmit;
        save(data);
        setState({ ...DEFAULT_STATE });
    }, [props.onSubmit, state]);

    return (
        <div className="Form__container">
            <p className="text-start">Form</p>
            <Form>
                <FormGroup>
                    <input
                        className={classNames("form-control", {
                            "is-invalid": hasError.name,
                        })}
                        value={state.name}
                        name="name"
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                    <div className="invalid-feedback text-start">
                        Please enter a name.
                    </div>
                </FormGroup>
                <FormGroup>
                    <input
                        className={classNames("form-control", {
                            "is-invalid": hasError.walletAddress,
                        })}
                        value={state.walletAddress}
                        name="walletAddress"
                        onChange={handleChange}
                        placeholder="Wallet Address"
                        required
                    />
                    <div className="invalid-feedback text-start">
                        Please enter an Ethereum wallet address.
                    </div>
                </FormGroup>
                <FormGroup>
                    <input
                        className={classNames("form-control", {
                            "is-invalid": hasError.email,
                        })}
                        value={state.email}
                        name="email"
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                    <div className="invalid-feedback text-start">
                        Please enter an email.
                    </div>
                </FormGroup>
                <div className="d-grid">
                    <Button color="primary" onClick={submitForm}>
                        {props.data ? "Update Account" : "Add Account"}
                    </Button>
                </div>
            </Form>
        </div>
    );
}
