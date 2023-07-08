import { LoginUserSchemaType, RegisterUserSchemaType } from "@/lib/validations/user.schema";
import { DashboardLinkComponent } from "../types/dashboard";

export const validateRegistrationForm = (values: RegisterUserSchemaType) => {
    const errors = {} as RegisterUserSchemaType;

    if (!values.username) {
        errors.username = 'Required';
    } else if (values.username.length < 2) {
        errors.username = 'Must be 2 characters or greater';
    } else if (values.username.length > 20) {
        errors.username = 'Must be 20 characters or less';
    } else if (!/^[a-z0-9_]+$/.test(values.username)) {
        errors.username = 'Must be alphanumeric and lowercase';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 6) {
        errors.password = 'Must be 6 characters or greater';
    }

    if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
};

export const validateLoginForm = (values: { username: string, password: string }) => {
    const errors = {} as LoginUserSchemaType;

    if (!values.username) {
        errors.username = 'Required';
    } else if (values.username.length < 2) {
        errors.username = 'Must be 2 characters or greater';
    } else if (values.username.length > 20) {
        errors.username = 'Must be 20 characters or less';
    } else if (!/^[a-z0-9_]+$/.test(values.username)) {
        errors.username = 'Must be alphanumeric and lowercase';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 6) {
        errors.password = 'Must be 6 characters or greater';
    }

    return errors;
};

export const validateUrlForm = (values: DashboardLinkComponent) => {
    let errors = {} as DashboardLinkComponent;

    if (values.name.length > 50) {
        errors.name = 'Must be 50 characters or less';
    }

    if (!values.originalURL) {
        errors.originalURL = 'Required';
    } else if (!/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/.test(values.originalURL)) {
        errors.originalURL = 'Invalid URL';
    }

    return errors;
};