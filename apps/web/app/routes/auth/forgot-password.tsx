import { GalleryVerticalEnd } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: Implement password reset once the backend endpoint is available
    toast.info("비밀번호 재설정 기능은 준비 중입니다.");
  };

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
              <CardTitle className="text-xl">비밀번호를 잊으셨나요?</CardTitle>
              <CardDescription>
                이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">이메일</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Field>
                  <Field>
                    <Button type="submit">재설정 링크 보내기</Button>
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
