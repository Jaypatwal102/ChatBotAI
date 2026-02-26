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
import { useRef, useState } from "react";
import { error } from "console";
interface SignupFormProps extends React.HTMLAttributes<HTMLDivElement> {
  error: string | null;
  name: string;
  email: string;
  password: string;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
export function SignupForm({
  error,
  name,
  email,
  password,
  className,
  setError,
  setEmail,
  setPassword,
  setName,
  loading,
  handleSubmit,
  ...props
}: React.ComponentProps<"div"> & SignupFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isInvalid =
    loading || name.length === 0 || email.trim() === "" || password.length < 8;
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
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
                <FieldLabel className="block w-full text-center" htmlFor="name">
                  Full Name
                </FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  onChange={(e) => {
                    setError(null);
                    setIsSubmitted(false);
                    setName(e.target.value);
                  }}
                />
              </Field>
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
                <Field>
                  <Field>
                    <FieldLabel
                      className="block w-full text-center"
                      htmlFor="password"
                    >
                      Password
                    </FieldLabel>
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
                </Field>
              </Field>
              <Field>
                <FieldDescription className="text-center text-red-500">
                  {error && <span>{error}</span>}
                  {isSubmitted && name.trim() === "" && "Name is required."}
                  {isSubmitted && email.trim() === "" && "Email is required."}
                  {isSubmitted &&
                    password.length < 8 &&
                    "Password must be at least 8 characters long."}
                </FieldDescription>
              </Field>

              <Field>
                <Button type="submit" disabled={isSubmitted && isInvalid}>
                  {loading ? "Creating account..." : "Sign Up"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
