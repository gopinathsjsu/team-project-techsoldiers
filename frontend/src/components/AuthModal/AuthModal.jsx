import React from "react";
import { useForm, useToggle, upperFirst } from "@mantine/hooks";
import {
  Drawer,
  Button,
  Group,
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  LoadingOverlay
} from "@mantine/core";
import { useMutation } from "react-query";
import { login, register, confirm } from "../../services/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { loginState } from "../../features/auth/loginSlice";
import { registerState, confirmState } from "../../features/auth/registerSlice";

export function AuthModal({ state, setState }) {
  const loginMutation = useMutation(login);
  const registerMutation = useMutation(register);
  const confirmMutation = useMutation(confirm);

  const dispatch = useDispatch();
  const registerCurrentState = useSelector((state) => state.register );
  const loginCurrentState = useSelector((state) => state.persistedReducer.login );
  
  const [type, toggle] = useToggle("login", ["login", "register", "confirm"]);

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      code: "",
      terms: true,
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 6,
    },
  });

  function onSubmitLogin(email, password) {
    loginMutation
      .mutateAsync({
        email: email,
        password: password,
      },
      )
      .then((res) => {
        const data = {
          jwt: {
            token: res.data.idToken.jwtToken,
            payload: res.data.idToken.payload,
          },
          refreshToken: res.data.refreshToken.token,
          accessToken: res.data.accessToken.jwtToken,
        };
        dispatch(loginState(data));
      });
  }

  function onSubmitRegister(name, email, password) {
    registerMutation.mutateAsync({
      name: name,
      email: email,
      password: password
    }).then((res) => {
      const data = {
        email: res.data.username,
        // TODO : logic for confirm if user is confirmed in server it self
      }
      dispatch(registerState(data));
      toggle("confirm")
    })
  }

  function onSubmitConfirm(code){
    confirmMutation.mutateAsync({
      code: code,
      email: registerCurrentState.data.email
    }).then((res) => {
        console.log(res);
        confirmState();
        setState(false);
    }).catch((err) => console.log(err))
  }
  return (
    <Drawer
      opened={state}
      onClose={() => setState(false)}
      title="Authenticate"
      padding="xl"
      size="xl"
    >
      {
        loginMutation.isLoading || registerMutation.isLoading ? (
          <LoadingOverlay visible={true} />
        ) : (
          <form
        onSubmit={form.onSubmit((values) => {
          if (type === "login") {
            onSubmitLogin(values.email, values.password);
          } else if (type === "register") {
            onSubmitRegister(values.name, values.email, values.password);
          } else if (type === "confirm"){
            onSubmitConfirm(values.code);
          }
        })}
      >
        <Group direction="column" grow>
        { type === "confirm" ? (
        <TextInput
        required
        label="Confirmation Code"
        placeholder="Your Confirmation Code"
        value={form.values.code}
        onChange={(event) =>
          form.setFieldValue("code", event.currentTarget.value)
        }
      />): (<> {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
            />
          )}
          
          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
          />
          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )}</>)}
        </Group>
        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="gray"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit">{upperFirst(type)}</Button>
        </Group>
      </form>
        )
      }

    </Drawer>
  );
}
