import { createContext } from "react";
import { User } from "../config/firebaseConfig"

export const AuthContext = createContext<User | null>(null);

