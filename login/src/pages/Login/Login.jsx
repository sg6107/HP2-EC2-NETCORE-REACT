import { useState } from "react";

function Login() {
    // forma basica
    const [email, setEmail] = useState('');
    const [password, setPaword] = useState('');
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const [realPassword, setRealPassword] = useState('');

    function validaciones() {
        // min, max, empty
        // password minimo 2, max 6
        // email no vacio
        if (email.length == 0) {
            setErrors({ ...errors, email: 'Debes colocar un email' })
        } else {
            setErrors({
                ...errors,
                email: ''
            });
        }

        if (password.length < 2 ||
            password.length > 6) {
            // hacer algo para pintar error
            setErrors({ ...errors, password: 'Tamaño invalido' })
        } else if (password.length == 0) {
            setErrors({ ...errors, password: 'No debe estar vacio' })
        } else {
            setErrors({
                ...errors,
                password: ''
            });
        }
    }

    function handlePassword(evento) {
        console.log(evento);
        const newCharater = evento.replaceAll('*', '');
        console.log(newCharater);
        setRealPassword(realPassword + newCharater);
        let pass = '';

        for(var i = 0; i < evento.length; i++) {
            pass += '*';
        }

        setPaword(pass)
    }

    function onSubmitHandler(evento) {
        evento.preventDefault();
        console.log(email, password, realPassword);

        // añadir validaciones
        validaciones();

        // llamar al api y esperar a que me diga si es correcto o no
    }

    return (
        <>
            <h1>Login</h1>

            <form onSubmit={onSubmitHandler}>
                <label>
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={(valor) => setEmail(valor.target.value)}
                    />
                    {errors.email && (<p style={{ color: 'red' }}>{errors.email}</p>)}
                </label>

                <br />

                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(valor) => handlePassword(valor.target.value)} />
                    {errors.password && (<p style={{ color: 'red' }}>{errors.password}</p>)}
                </label>

                <br />

                <button type="submit">Iniciar Sesion</button>
            </form>
        </>
    );
}

export default Login;