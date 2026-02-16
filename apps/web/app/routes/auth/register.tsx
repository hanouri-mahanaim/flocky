import { Eye, EyeOff, GalleryVerticalEnd } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRegister } from "@/hooks/use-auth";
import { requireGuest } from "@/lib/require-auth";
import { cn } from "@/lib/utils";

export function clientLoader() {
  requireGuest();
  return null;
}

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressState, setAddressState] = useState("");
  const [addressPostalCode, setAddressPostalCode] = useState("");
  const [addressCountry, setAddressCountry] = useState("");

  const { mutateAsync: register, isPending } = useRegister();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("비밀번호가 일치하지 않습니다. 두 비밀번호가 동일한지 확인해주세요.");
      return;
    }

    try {
      await register({
        name,
        email,
        password,
        gender,
        birthday: birthday || undefined,
        phoneNumber: phoneNumber || undefined,
        addressStreet: addressStreet || undefined,
        addressCity: addressCity || undefined,
        addressState: addressState || undefined,
        addressPostalCode: addressPostalCode || undefined,
        addressCountry: addressCountry || undefined,
      });
      navigate("/app/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "회원가입에 실패했습니다";
      toast.error(message);
    }
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
              <CardTitle className="text-xl">계정 만들기</CardTitle>
              <CardDescription>아래에 이메일을 입력하여 계정을 만드세요</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">이름</FieldLabel>
                    <Input
                      id="name"
                      type="text"
                      placeholder="홍길동"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isPending}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">이메일</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isPending}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="gender">성별</FieldLabel>
                    <Select value={gender} onValueChange={setGender} required disabled={isPending}>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="성별을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">남성</SelectItem>
                        <SelectItem value="FEMALE">여성</SelectItem>
                        <SelectItem value="OTHER">기타</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="birthday">생년월일</FieldLabel>
                    <Input
                      id="birthday"
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      disabled={isPending}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="phoneNumber">전화번호</FieldLabel>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="+64211234567"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      disabled={isPending}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="addressStreet">주소</FieldLabel>
                    <Input
                      id="addressStreet"
                      type="text"
                      placeholder="123 Queen Street"
                      value={addressStreet}
                      onChange={(e) => setAddressStreet(e.target.value)}
                      disabled={isPending}
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="addressCity">도시</FieldLabel>
                      <Input
                        id="addressCity"
                        type="text"
                        placeholder="Auckland"
                        value={addressCity}
                        onChange={(e) => setAddressCity(e.target.value)}
                        disabled={isPending}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="addressState">시/도</FieldLabel>
                      <Input
                        id="addressState"
                        type="text"
                        placeholder="Auckland"
                        value={addressState}
                        onChange={(e) => setAddressState(e.target.value)}
                        disabled={isPending}
                      />
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="addressPostalCode">우편번호</FieldLabel>
                      <Input
                        id="addressPostalCode"
                        type="text"
                        placeholder="1010"
                        value={addressPostalCode}
                        onChange={(e) => setAddressPostalCode(e.target.value)}
                        disabled={isPending}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="addressCountry">국가</FieldLabel>
                      <Input
                        id="addressCountry"
                        type="text"
                        placeholder="New Zealand"
                        value={addressCountry}
                        onChange={(e) => setAddressCountry(e.target.value)}
                        disabled={isPending}
                      />
                    </Field>
                  </div>
                  <Field>
                    <Field>
                      <FieldLabel htmlFor="password">비밀번호</FieldLabel>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={isPending}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="confirm-password">비밀번호 확인</FieldLabel>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={showPassword ? "text" : "password"}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          disabled={isPending}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                    </Field>
                    <FieldDescription>최소 8자 이상이어야 합니다.</FieldDescription>
                  </Field>
                  <Field>
                    <Button type="submit" disabled={isPending}>
                      {isPending ? "계정 만드는 중..." : "계정 만들기"}
                    </Button>
                    <FieldDescription className="text-center">
                      이미 계정이 있으신가요? <Link to="/auth/login">로그인</Link>
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
