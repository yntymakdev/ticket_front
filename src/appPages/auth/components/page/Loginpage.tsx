"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useLoginMutation, useRegisterMutation } from "@/redux/api/auth";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

interface IAuthForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const {
    register: formRegister,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAuthForm>();

  const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
    try {
      if (isLogin) {
        const res = await login(data).unwrap();
        toast.success("Успешный вход");
        router.push("/tickets/dashboard");
      } else {
        const res = await register(data).unwrap();
        toast.success("Регистрация прошла успешно");
        router.push("/tickets/dashboard");
      }
      reset();
    } catch (err: any) {
      console.error("Auth error:", err);
      const msg = err?.data?.message || (isLogin ? "Ошибка входа" : "Ошибка регистрации");
      toast.error(msg);
    }
  };

  return (
    <section className="centered min-h-screen">
      <Toaster position="top-center" />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{isLogin ? "Войти" : "Регистрация"}</CardTitle>
          <CardDescription>{isLogin ? "Введите свою почту и пароль " : "Введите свою почту и пароль"}</CardDescription>
          <CardAction>
            <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Переход к регистру" : "Переключиться на вход в систему"}
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="email">Почта</label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...formRegister("email", { required: "Введите email" })}
                className={errors.email ? "border border-red-500" : ""}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="grid gap-2">
              <label htmlFor="password">Пароль</label>
              <Input
                id="password"
                type="password"
                placeholder="******"
                {...formRegister("password", { required: "Введите пароль" })}
                className={errors.password ? "border border-red-500" : ""}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isLogin ? isLoginLoading : isRegisterLoading}>
              {isLogin ? "Вход" : "Регистрация"}
            </Button>
          </form>
        </CardContent>

        <CardFooter></CardFooter>
      </Card>
    </section>
  );
};

export default LoginPage;
