"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useLoginMutation } from "@/redux/api/auth";
import { Card } from "@/components/ui/card";

interface IAuthForm {
  email: string;
  password: string;
}

const Registerpage = () => {
  const { register, handleSubmit } = useForm<IAuthForm>();
  // const [loginMutation] = useLoginMutation();

  // const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
  //   try {
  //     const { data: responseData, error } = await loginMutation(data);
  //     if (responseData) {
  //       localStorage.setItem("tokens", JSON.stringify(responseData));
  //       window.location.reload();
  //     } else {
  //       const errorMessage = error as { data: { message: string } };
  //       alert(errorMessage.data.message);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <section>
      <h1>
        Register Page
        <Card />
      </h1>
    </section>
  );
  {
    /* <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="email"
          type="text"
          {...register("email", {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          })}
        />
        <input placeholder="password" type="text" {...register("password", { required: true })} />
        <button type="submit">Вход</button>
      </form> */
  }
};

export default Registerpage;
