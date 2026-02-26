import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
  error: string | null;
  email: string;
  password: string;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function LoginForm({
  error,
  email,
  password,
  className,
  setError,
  setEmail,
  setPassword,
  loading,
  handleSubmit,
  ...props
}: LoginFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isInvalid = loading || email.trim() === "" || password.length < 8;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsSubmitted(true);
              if (!isInvalid) {
                handleSubmit(e);
              }
            }}
          >
            <FieldGroup>
              <Field>
                <FieldLabel
                  className="block w-full text-center"
                  htmlFor="email"
                >
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => {
                    setError(null);
                    setIsSubmitted(false);
                    setEmail(e.target.value);
                  }}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel
                    className="block w-full text-center"
                    htmlFor="password"
                  >
                    Password
                  </FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => {
                    setError(null);
                    setIsSubmitted(false);
                    setPassword(e.target.value);
                  }}
                />
              </Field>
              <Field>
                <FieldDescription className="text-center text-red-500">
                  {error && <span>{error}</span>}
                  {isSubmitted && email.trim() === "" && "Email is required."}
                  {isSubmitted &&
                    password.length > 0 &&
                    password.length < 8 &&
                    "Password must be at least 8 characters long."}
                </FieldDescription>
              </Field>

              <Field>
                <Button type="submit" disabled={isSubmitted && isInvalid}>
                  {loading ? "Logging in..." : "Login"}
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
