import React, {useState} from 'react';

import {Button, Paper, Stack, TextField, Typography} from '@mui/material';
import {sx} from './sx'
import {useAuth} from "@containers/auth/hooks/useAuth";
import Spinner from "@ui/spinner/Spinner";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import ErrorHelper from "@ui/errors/errorHelper/ErrorHelper";


const SignIng = () => {

    const {
        signIn,
        isLoading,
        isError,
        errorMessages,
    } = useAuth();

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')


    const onLogin = async () => {
       await signIn({username:login, password});
    };

    if (isLoading) {
        return <Spinner/>
    }

    return (
        <Stack
            sx={sx.root}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <Paper
                elevation={3}
                sx={sx.paper}
            >
                <Stack
                    gap={2}
                >
                    <Stack
                        gap={2}
                        direction={'row'}
                        alignItems={'center'}
                    >
                        <PersonPinIcon
                            fontSize={'large'}
                        />

                        <Typography
                            variant={'body1'}
                        >
                            Вхід
                        </Typography>
                    </Stack>


                    <TextField
                        value={login}
                        onChange={(event) => setLogin(event.target.value)}
                        size={'small'}
                        name="login"
                        id={'login'}
                        label={'login'}
                    />


                    <TextField
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type={'password'}
                        size={'small'}
                        name="password"
                        label={'password'}
                        id={'password'}
                    />

                    <Button
                        disabled={isLoading}
                        fullWidth
                        type="submit"
                        variant="contained"
                        onClick={onLogin}
                    >
                        Увійти
                    </Button>

                    {isError && errorMessages && <ErrorHelper>
                        {errorMessages}
                    </ErrorHelper>}
                </Stack>

            </Paper>
        </Stack>
    );
};


export default SignIng;
