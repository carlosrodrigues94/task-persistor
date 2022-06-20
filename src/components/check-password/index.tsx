import { createCipheriv, createHash } from "crypto";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/use-auth";

import { ButtonsContent, Container, Content, Input } from "./styles";

interface ModalCheckPasswordProps {
  isOpen: boolean;
}

export const ModalCheckPassword: React.FC<ModalCheckPasswordProps> = ({
  isOpen,
}) => {
  const [password, setPassword] = useState("");
  const [isErrored, setIsErrored] = useState(false);
  const { handleGetCurrentUser, userData } = useAuth();

  const handleAuthenticate = useCallback(() => {
    setIsErrored(false);

    if (password.length < 8) {
      setIsErrored(true);

      toast.error("O password deve ter mais de 6 dígitos");

      return;
    }

    const hash = createHash("sha256", {});

    const final = hash
      .update(password)
      .digest()
      .toString("base64")
      .replaceAll("/", "");

    setPassword("");

    console.log(final);
  }, [password]);

  return (
    <Container style={{ display: isOpen ? "flex" : "none" }}>
      <Content>
        <h4>Para assegurar seus dados, por favor insira sua senha</h4>

        <Input
          type="password"
          value={password}
          isErrored={isErrored}
          onBlur={() => setIsErrored(false)}
          onChange={(event) => setPassword(event.target.value)}
        />

        <ButtonsContent>
          <button type="button" onClick={handleAuthenticate}>
            Autenticar
          </button>
          <button type="button" onClick={() => {}}>
            Cancelar
          </button>
        </ButtonsContent>
      </Content>
    </Container>
  );
};
