import { useState } from "react";
import Form from "../../ui/Form";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("mohitcoc2001@gmail.com");
  const [password, setPassword] = useState("Mohit@2001");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    // <Form onSubmit={handleSubmit}>
    //   <FormRow label="Email address" orientation="vertical">
    //     <Input
    //       type="email"
    //       id="email"
    //       // This makes this form better for password managers
    //       autoComplete="username"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //   </FormRow>
    //   <FormRow label="Password" orientation="vertical">
    //     <Input
    //       type="password"
    //       id="password"
    //       autoComplete="current-password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //   </FormRow>
    //   <FormRow orientation="vertical">
    //     <Button size="large">Login</Button>
    //   </FormRow>
    // </Form>
    <Form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="form-label">
          Email Address
        </label>

        <input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          disabled={isLoading}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control py-3  "
        />
        <label htmlFor="password" className="form-label mt-3 ">
          Password
        </label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className="form-control py-3  "
        />
        <button
          className="btn btn-primary form-control mt-4 py-3 "
          disabled={isLoading}
          type="submit"
        >
          {!isLoading ? "Login" : <SpinnerMini />}
        </button>
      </div>
    </Form>
  );
}

export default LoginForm;
