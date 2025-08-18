import { createContext } from "react";
import { UserDetail } from "@/app/provider";



// Create context with undefined default for better type safety
export const UserDetailContext = createContext<any>(null);

// Optional: add display name for easier 
