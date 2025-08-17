import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// 1. Definir el contrato / esquema / campos de mi formulario
const loginSchema = z.object({
    email: z
        .string()
        .min(2, { message: 'Muy chiquito' })
        .max(10, { message: 'Muy grande' }),
    password: z
        .string()
        .nonempty({ message: 'Pon la contraseña oye!' })
})

function Login3() {
    // forma con react hook form
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: zodResolver(loginSchema) });

    function onSubmitHandler(data) {
        console.log('me ejecuto', data);

        // llamar al api y esperar a que me diga si es correcto o no
    }

    return (
        <>
            <h1>Login</h1>

            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <label>
                    Email
                    <input
                        {...register("email")}
                    />
                    {errors.email && (<p style={{ color: 'red' }}>{errors.email.message}</p>)}
                </label>

                <br />

                <label>
                    Password
                    <input
                        type="password"
                        {...register("password")}
                    />
                    {errors.password && (<p style={{ color: 'red' }}>{errors.password.message}</p>)}
                </label>

                <br />

                <button type="submit">Iniciar Sesion</button>
            </form>
        </>
    );
}

export default Login3;