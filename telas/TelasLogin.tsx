// telas/TelaLogin.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Input } from "..//..//..//src//components//Input";
import { theme } from "..//..//..//src//theme";

type TelaLoginProps = {
  onLoginSucesso: () => void;
};

export function TelaLogin({ onLoginSucesso }: TelaLoginProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleEntrar = () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha o e-mail e a senha.");
      return;
    }

    // Aqui depois você coloca a chamada real para o backend / Supabase
    Alert.alert("Entrando...", `Login com: ${email}`);
    onLoginSucesso();
  };

  const handleCadastrar = () => {
    Alert.alert("Cadastro", "Navegar para tela de cadastro.");
  };

  const handleEsqueciSenha = () => {
    Alert.alert("Recuperar senha", "Enviaremos um link para seu e-mail.");
  };

  const handleGoogle = () => {
    Alert.alert("Google", "Login com Google ainda não implementado.");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={40} color="#fff" />
          </View>

          {/* Cabeçalho */}
          <Text style={styles.titulo}>Login</Text>
          <Text style={styles.subtitulo}>Entre com suas credenciais</Text>

          {/* Formulário */}
          <View style={styles.form}>
            {/* E-mail */}
            <Input
              label="E-mail"
              placeholder="seuemail@exemplo.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              leftIcon={
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color={theme.colors.placeholder}
                />
              }
            />

            {/* Senha */}
            <Input
              label="Senha"
              placeholder="Sua senha"
              secureTextEntry={!mostrarSenha}
              value={senha}
              onChangeText={setSenha}
              leftIcon={
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={theme.colors.placeholder}
                />
              }
              rightElement={
                <TouchableOpacity
                  onPress={() => setMostrarSenha(!mostrarSenha)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons
                    name={mostrarSenha ? "eye-off-outline" : "eye-outline"}
                    size={18}
                    color={theme.colors.placeholder}
                  />
                </TouchableOpacity>
              }
            />

            {/* Esqueci senha */}
            <TouchableOpacity
              style={styles.esqueciContainer}
              onPress={handleEsqueciSenha}
            >
              <Text style={styles.esqueciTexto}>Esqueci minha senha</Text>
            </TouchableOpacity>

            {/* Botão Entrar */}
            <TouchableOpacity style={styles.botaoPrimario} onPress={handleEntrar}>
              <Ionicons
                name="log-in-outline"
                size={20}
                color="#fff"
                style={styles.botaoIcone}
              />
              <Text style={styles.botaoPrimarioTexto}>Entrar</Text>
            </TouchableOpacity>

            {/* Divisor "ou" */}
            <View style={styles.divisorContainer}>
              <View style={styles.divisorLinha} />
              <Text style={styles.divisorTexto}>ou</Text>
              <View style={styles.divisorLinha} />
            </View>

            {/* Botão Google */}
            <TouchableOpacity style={styles.botaoGoogle} onPress={handleGoogle}>
              <Text style={styles.googleG}>G</Text>
              <Text style={styles.botaoGoogleTexto}>Continuar com Google</Text>
            </TouchableOpacity>
          </View>

          {/* Rodapé */}
          <View style={styles.rodape}>
            <Text style={styles.rodapeTexto}>Não tem uma conta? </Text>
            <TouchableOpacity onPress={handleCadastrar}>
              <Text style={styles.rodapeLink}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Aqui você pode reaproveitar exatamente o mesmo objeto `styles` que já tinha
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  flex: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    alignItems: "center",
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing.xxl,
    marginBottom: theme.spacing.lg,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  titulo: {
    fontSize: theme.font.sizeXl,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitulo: {
    fontSize: theme.font.sizeSm,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.xxl,
  },
  form: {
    width: "100%",
    gap: theme.spacing.sm,
  },
  esqueciContainer: {
    alignSelf: "flex-end",
    marginTop: -theme.spacing.xs,
  },
  esqueciTexto: {
    fontSize: theme.font.sizeXs,
    color: theme.colors.link,
    fontWeight: "500",
  },
  botaoPrimario: {
    flexDirection: "row",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    paddingVertical: theme.button.paddingVertical,
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing.sm,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  botaoIcone: {
    marginRight: theme.spacing.sm,
  },
  botaoPrimarioTexto: {
    color: "#fff",
    fontSize: theme.font.sizeLg,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  divisorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: theme.spacing.xs,
  },
  divisorLinha: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  divisorTexto: {
    marginHorizontal: theme.spacing.md,
    color: theme.colors.placeholder,
    fontSize: theme.font.sizeXs,
  },
  botaoGoogle: {
    flexDirection: "row",
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    paddingVertical: theme.button.paddingVertical,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  googleG: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4285F4",
    marginRight: theme.spacing.sm,
  },
  botaoGoogleTexto: {
    fontSize: theme.font.sizeMd,
    color: theme.colors.textLabel,
    fontWeight: "600",
  },
  rodape: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing.xxl,
  },
  rodapeTexto: {
    fontSize: theme.font.sizeSm,
    color: theme.colors.textMuted,
  },
  rodapeLink: {
    fontSize: theme.font.sizeSm,
    color: theme.colors.link,
    fontWeight: "700",
  },
});
