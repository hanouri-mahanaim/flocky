import { Eye, EyeOff, GalleryVerticalEnd } from "lucide-react";
import React, { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("비밀번호가 일치하지 않습니다");
      return;
    }

    if (!token) {
      toast.error("유효하지 않거나 누락된 재설정 토큰입니다");
      return;
    }

    // TODO: Implement password reset once the backend endpoint is available
    toast.info("비밀번호 재설정 기능은 준비 중입니다.");
  };

  if (!token) {
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
                <CardTitle className="text-xl">유효하지 않은 링크</CardTitle>
                <CardDescription>
                  이 비밀번호 재설정 링크가 유효하지 않거나 만료되었습니다. 새로운 링크를
                  요청해주세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/auth/forgot-password">새 재설정 링크 요청</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
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
              <CardTitle className="text-xl">비밀번호 재설정</CardTitle>
              <CardDescription>새 비밀번호를 입력해주세요</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="password">새 비밀번호</FieldLabel>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">새 비밀번호 확인</FieldLabel>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                    <FieldDescription>최소 8자 이상이어야 합니다.</FieldDescription>
                  </Field>
                  <Field>
                    <Button type="submit">비밀번호 재설정</Button>
                    <FieldDescription className="text-center">
                      비밀번호가 기억나셨나요? <Link to="/auth/login">로그인</Link>
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
