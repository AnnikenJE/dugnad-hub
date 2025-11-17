import { AuthSessionProvider } from "@/providers/authctx";
import { Slot } from "expo-router";

// ----------------------------------
export default function AuthSessionLayout() {
  // Return ----------------------------------
  return (
    <AuthSessionProvider>
      <Slot />
    </AuthSessionProvider>
  );
}
