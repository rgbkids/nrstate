import React from "react";
export default function PageStateProvider<T>({ children, current, }: {
    children: React.ReactNode;
    current: T;
}): JSX.Element;
