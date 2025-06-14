"use client";

import React from "react";
import { AuthProvider } from "./hooks/useAuth";

function Provider({ children }: { children: React.ReactNode }) {
   return <AuthProvider>{children}</AuthProvider>;
}

export default Provider;
