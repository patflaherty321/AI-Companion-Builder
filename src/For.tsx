import React from "react";

interface ForProps<T> {
  each: T[];
  children: (item: T, index: number) => React.ReactNode;
}

export function For<T>({ each, children }: ForProps<T>) {
  return (
    <>
      {each.map((item, index) => (
        <React.Fragment key={index}>{children(item, index)}</React.Fragment>
      ))}
    </>
  );
}
