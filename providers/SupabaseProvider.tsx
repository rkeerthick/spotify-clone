"use client";

import { SupabaseProps } from "@/types";
import { Database } from "@/types_db";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import React, { useState } from "react";

const SupabaseProvider: React.FC<SupabaseProps> = ({ children }) => {
  const [superbaseClient] = useState(() =>
    createClientComponentClient<Database>()
  );
  return (
    <SessionContextProvider supabaseClient={superbaseClient}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
