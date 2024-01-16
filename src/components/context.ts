import { createContext } from "react";

type Data = {[key: string]: string};
export const DataContext = createContext<Data>({});