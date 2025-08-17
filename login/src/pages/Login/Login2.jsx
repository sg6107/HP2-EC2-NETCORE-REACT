import { useState } from "react";
import { useForm } from "react-hook-form";

function Login2() {
    // forma con react hook form
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

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
                        {...register("email", {
                            minLength: {
                                value: 5,
                                message: "Debe tener minimo 5"
                            }
                        })
                        }
                    />
                    {errors.email && (<p style={{ color: 'red' }}>{errors.email.message}</p>)}
                </label>

                <br />

                <label>
                    Password
                    <input
                        {...register("password", {
                            minLength: {
                                value: 2,
                                message: "muy chiquito"
                            },
                            maxLength: {
                                value: 6,
                                message: "muy grande"
                            }
                        })
                        }
                     />
                    {errors.password && (<p style={{ color: 'red' }}>{errors.password.message}</p>)}
                </label>

                <br />

                <button type="submit">Iniciar Sesion</button>
            </form>
        </>
    );
}

export default Login2;