import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextField } from "@components/Form/TextField";
import { Button } from "@components/Button/Button";
import { Typography } from "@components/Typography/Typography";
import { useAuthSignin } from "@apis/auth";
import { useNavigate } from "react-router-dom";
import { PATH } from "@configs/path";

const SignInSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type SignInSchemaType = z.infer<typeof SignInSchema>;

export const SigninPage = () => {
  const navigate = useNavigate();

  const { mutate: mutateSignin } = useAuthSignin({
    onSuccess: () => {
      navigate(PATH.APP_POST);
    },
  });

  const signinSchema = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { control, handleSubmit } = signinSchema;

  const onLogin: SubmitHandler<SignInSchemaType> = (data) => {
    mutateSignin(data);
  };

  return (
    <div className="absolute w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <TextField
        name="username"
        control={control}
        label="Username"
        textOption={{
          className:
            "text-black capitalize font-montSans leading-normal text-left",
        }}
      />

      <TextField
        name="password"
        control={control}
        label="Password"
        textOption={{
          className:
            "text-black capitalize font-montSans leading-normal text-left",
        }}
      />

      <div className="mt-4 text-center">
        <Button type="submit" onClick={handleSubmit(onLogin)}>
          <Typography>Login</Typography>
        </Button>
      </div>
    </div>
  );
};
