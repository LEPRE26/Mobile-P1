// App.tsx
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { pegarTokenDoCelular, salvarTokenNoCelular, } from "..//..//servicos//authServevice"; // ajuste o caminho/nome certo
import { TelaLogin } from "./telas/TelasLogin";

export default function App() {
  const [usuarioEstaLogado, setUsuarioEstaLogado] = useState(false);
  const [verificandoToken, setVerificandoToken] = useState(true);

  useEffect(() => {
    const verificarAcesso = async () => {
      const token = await pegarTokenDoCelular();
      if (token) {
        setUsuarioEstaLogado(true);
      }
      setVerificandoToken(false);
    };

    verificarAcesso();
  }, []);

  const sairDoSistema = async () => {
    await salvarTokenNoCelular(""); // limpa o token
    setUsuarioEstaLogado(false);
  };

  if (verificandoToken) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Verificando acesso...</Text>
      </View>
    );
  }

  if (!usuarioEstaLogado) {
    return (
      <TelaLogin
        onLoginSucesso={async () => {
          // aqui você poderia receber um token real da API
          await salvarTokenNoCelular("token-falso");
          setUsuarioEstaLogado(true);
        }}
      />
    );
  }

  return (
    <View style={styles.center}>
      <Text>Bem-vindo ao sistema interno!</Text>
      <Text>Seu token está salvo e validado.</Text>
      <Button title="Sair" onPress={sairDoSistema} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
