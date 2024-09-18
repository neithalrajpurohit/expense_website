import { AppRouter } from "@/server/api/root";
import { TRPCClientErrorLike } from "@trpc/client";
import { UseTRPCQueryResult } from "@trpc/react-query/shared";
import { inferRouterOutputs } from "@trpc/server";
import { format } from "date-fns";
import React, { useState } from "react";

type TExpanseProps = NonNullable<
  UseTRPCQueryResult<
    inferRouterOutputs<AppRouter>["user"]["getAllExpanse"],
    TRPCClientErrorLike<AppRouter>
  >
>;

type TExpanseTable = {
  expanses: TExpanseProps;
  calculateTotal: number;
  todayClosing: number;
  handleDate: (value: Date) => void;
};

const ExpanseTable = ({
  expanses,
  calculateTotal,
  todayClosing,
  handleDate,
}: TExpanseTable) => {
  const [expanseDate, setExpanseDate] = useState(new Date());
  return (
    <div className="w-full">
      <table className="mx-auto max-w-[700px]">
        <thead>
          <tr>
            <th>Title</th>
            <th>Expenses</th>
          </tr>
        </thead>
        <tbody>
          {expanses.data?.length &&
            expanses.data.map((expanse) => {
              return (
                <tr key={expanse.id}>
                  <td>{expanse.title}</td>
                  <td>{expanse.price}</td>
                </tr>
              );
            })}
          <tr className="my-4 inline-block" />
          <tr className="w-full pt-9 font-bold">
            <td className="w-full">Total Spent</td>
            <td className="ml-auto w-[100px]">{calculateTotal}</td>
          </tr>
          <tr className="mt-4 w-full font-bold">
            <td className="w-full">Closing</td>
            <td className="ml-auto w-[100px]">{todayClosing}</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-14 flex justify-center gap-14">
        <p
          className="cursor-pointer select-none"
          onClick={() => {
            const newDate = new Date(expanseDate);
            newDate.setDate(newDate.getDate() - 1);
            setExpanseDate(newDate);
            handleDate(newDate);
          }}
        >
          &larr;
        </p>
        {new Date().getDate() === expanseDate.getDate() &&
        new Date().getFullYear() === expanseDate.getFullYear() ? (
          "Today"
        ) : (
          <span>{format(expanseDate, "dd-MMMM-yy")}</span>
        )}
        <p
          className="cursor-pointer select-none"
          onClick={() => {
            const newDate = new Date(expanseDate);
            newDate.setDate(newDate.getDate() + 1);
            setExpanseDate(newDate);
            handleDate(newDate);
          }}
        >
          &rarr;
        </p>
      </div>
    </div>
  );
};

export default ExpanseTable;
