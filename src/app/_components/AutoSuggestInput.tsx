import React from "react";
import _ from "lodash";

type TSuggestions = {
  id: number;
  label: string;
};

type TAutoSuggestProps<
  T extends string | number | readonly string[] | undefined,
> = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: T;
  suggestions?: TSuggestions[];
  onClick: (value: string, id: number) => void;
};

const AutoSuggestInput = <
  T extends string | number | readonly string[] | undefined,
>({
  onChange,
  value,
  suggestions,
  onClick,
}: TAutoSuggestProps<T>) => {
  return (
    <div className="relative flex w-full flex-col border">
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Enter Expense"
        className="w-[50%]"
      />
      <div className="absolute top-9 z-10 w-[50%] border shadow-lg">
        {suggestions &&
          suggestions.map((suggestion) => {
            return (
              <div
                onClick={() => onClick(suggestion.label, suggestion.id)}
                key={suggestion.id}
                className="w-full cursor-pointer rounded-sm  bg-white px-3 py-2 hover:bg-gray-100"
              >
                {suggestion.label}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AutoSuggestInput;
