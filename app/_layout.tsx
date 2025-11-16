import { AuthSessionProvider } from "@/providers/authctx";
import { Slot } from "expo-router";

export default function AuthSessionLayout() {
    return(
        <AuthSessionProvider>
            <Slot/>
        </AuthSessionProvider>
    )
}

