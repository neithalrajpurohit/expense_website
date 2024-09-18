"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/_components/Navbar";
import { api } from "./_trpc/client";
import CurrencyInput from "react-currency-input-field";
import { format, toDate } from "date-fns";
import ExpanseTable from "./_components/ExpanseTable";
import { useDebounce } from "./_hooks/useDebounce";
import AutoSuggestInput from "./_components/AutoSuggestInput";
import toast from "react-hot-toast";

const Home = () => {
  const [expanseDetail, setExpanseDetail] = useState({ price: "", title: "" });
  const [todayClosing, setTodayClosing] = useState<number | null>(0);
  const [calculateTotal, setCalculateTotal] = useState<number | null>(null);
  const [todaySale, setTodaySale] = useState<number | null>(0);
  const [date, setDate] = useState(new Date());
  const user = api.user.myProfile.useQuery();
  const expanses = api.user.getAllExpanse.useQuery({ date });
  const title = useDebounce(expanseDetail.title, 500);

  const searchQuery = api.user.getSearchSuggestions.useQuery(
    { title: title },
    { enabled: title.length >= 2 },
  );
  const handleDate = (value: Date) => {
    setDate(value);
  };

  const expanseApi = api.user.createExpense.useMutation({
    onSettled: () => {
      expanses.refetch();
      setExpanseDetail({ price: "", title: "" });
    },
  });

  useEffect(() => {
    const total = expanses.data?.reduce((acc, curr) => {
      return acc + Number(curr.price);
    }, 0);

    setCalculateTotal(total);
  }, [expanses]);

  useEffect(() => {
    if (todaySale && calculateTotal) {
      const closingPrice = todaySale - calculateTotal;
      setTodayClosing(closingPrice);
    }
  }, [todaySale]);

  if (user.isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar user={user.data!} isLoading={user.isLoading} />

      <div className="relative top-[100px] mx-auto max-w-screen-xl">
        <p>Opening: 0</p>
        <div className="mt-2 flex items-center gap-2">
          <p>Sale:</p>
          <CurrencyInput
            id="input-example"
            name="input-name"
            placeholder="Enter"
            value={todaySale?.toString()}
            decimalsLimit={2}
            onValueChange={(value, name, values) => {
              setTodaySale(Number(value));
            }}
          />
        </div>
        <p className="text-center">{format(new Date(), "dd-MMMM-yy")}</p>
        <div className="flex items-center justify-center gap-2">
          <div className="w-[50%]">
            <AutoSuggestInput
              value={expanseDetail.title}
              suggestions={searchQuery.data?.map((data) => {
                return {
                  id: data.id,
                  label: data.title,
                };
              })}
              onChange={(e) => {
                setExpanseDetail({
                  ...expanseDetail,
                  title: e.currentTarget.value,
                });
              }}
            />
          </div>
          <CurrencyInput
            id="input-example"
            name="input-name"
            placeholder="Amount"
            value={expanseDetail.price}
            decimalsLimit={2}
            onValueChange={(value, name, values) => {
              setExpanseDetail({ ...expanseDetail, price: value! });
            }}
          />
          <button
            onClick={() => {
              if (expanseDetail.title && expanseDetail.price) {
                expanseApi.mutate(expanseDetail);
              } else {
                toast.error("Add an Item");
              }
            }}
          >
            ADD
          </button>
        </div>
        <div className="mt-4 flex justify-center">
          <ExpanseTable
            expanses={expanses}
            calculateTotal={calculateTotal}
            todayClosing={todayClosing}
            handleDate={handleDate}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
