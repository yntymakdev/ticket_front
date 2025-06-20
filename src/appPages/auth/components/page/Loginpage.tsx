"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useLoginMutation } from "@/redux/api/auth";
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

interface IAuthForm {
  email: string;
  password: string;
}

const Loginpage = () => {
  //   const { register, handleSubmit } = useForm<IFormInput>();

  return (
    <section>
      <div className="centered">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>Enter your email below to login to your account</CardDescription>
            <CardAction>
              <Button variant="link">Register</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <label htmlFor="email">Email</label>
                  <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                  <Input id="password" type="password" required placeholder="******" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Register
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default Loginpage;
