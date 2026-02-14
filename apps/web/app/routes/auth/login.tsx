import { Eye, EyeOff, GalleryVerticalEnd, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin, useSession } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { data: session, isPending, error } = useSession();
  const { mutateAsync: login, isPending: isLoggingIn } = useLogin();
  const navigate = useNavigate();

  // redirect if the user is already logged in
  useEffect(() => {
    if (!isPending && session) {
      navigate("/app/dashboard");
    }
  }, [session, isPending, navigate]);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await login({ email, password });
      navigate("/app/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "로그인에 실패했습니다";
      toast.error(message);
    }
  };

  if (isPending) {
    return (
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-4">
        <p className="text-destructive">세션을 불러오는데 실패했습니다</p>
      </div>
    );
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link to="/" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Flocky
        </Link>
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">다시 오신 것을 환영합니다</CardTitle>
              <CardDescription>Google 계정으로 로그인하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <FieldGroup>
                  <Field>
                    <Button variant="outline" type="button" disabled>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                          fill="currentColor"
                        />
                      </svg>
                      Google로 로그인 (준비 중)
                    </Button>
                  </Field>
                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    또는
                  </FieldSeparator>
                  <Field>
                    <FieldLabel htmlFor="email">이메일</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoggingIn}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">비밀번호</FieldLabel>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoggingIn}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                    <div className="flex items-center justify-center">
                      <Link
                        to="/auth/forgot-password"
                        className="text-sm underline-offset-4 hover:underline"
                      >
                        비밀번호를 잊으셨나요?
                      </Link>
                    </div>
                  </Field>
                  <Field>
                    <Button type="submit" disabled={isLoggingIn}>
                      {isLoggingIn ? "로그인 중..." : "로그인"}
                    </Button>
                    <FieldDescription className="text-center">
                      계정이 없으신가요? <Link to="/auth/register">회원가입</Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
