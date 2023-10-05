import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export function useAuthContext() {

    const context = useContext(AuthContext)

    if(!context) {
        throw Error("Вне контекста братиш")
    }

  return context
}
