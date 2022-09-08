import React, { useState } from "react";
import classNames from "@/utils/classNames";
import Card from "@/uiComponents/Card";
import { EyeIcon } from "@heroicons/react/solid";
import Button from "@/uiComponents/Button";

const SuggestedForYou = () => {
  const [step, setStep] = useState(1);
  return (
    <div className="mt-4">
      <Card>
        <span className="text-white text-md font-medium">
          Suggested for you
        </span>
        <div className="text-slate-400 text-sm flex mt-2 font-medium">
          <EyeIcon className="h-5 w-5 mr-2" /> Private to you
        </div>
        <div className="mt-2">
          <div aria-hidden="true">
            <div className="text-white">
              <div className="block flex items-center justify-between">
                <span>Beginner</span>
                <span>{step === 1 ? "0%" : step === 2 ? "50%" : "100%"}</span>
              </div>
            </div>
            <div className="bg-slate-600 rounded-full overflow-hidden mt-1">
              <div
                className="h-2 bg-indigo-600 rounded-full"
                style={{
                  width:
                    step === 1
                      ? "0%"
                      : step === 2
                      ? "50.5%"
                      : step === 3
                      ? "100%"
                      : "0%",
                }}
              />
            </div>
            <div className="text-white font-medium text-md mt-1 space-x-2">
              <span>Complete 7 step to achive</span>
              <span className="text-blue-300 cursor-pointer hover:underline">
                All-star
              </span>
            </div>
            <div className="hidden sm:grid grid-cols-3 text-sm font-medium text-gray-500 mt-2">
              <div
                className={classNames(
                  step === 1 || step === 2 || step == 3
                    ? "text-indigo-600"
                    : "",
                  "text-left"
                )}
              />

              <div
                className={classNames(
                  step === 2 || step === 3 ? "text-indigo-600" : "",
                  "text-center"
                )}
              />

              <div
                className={classNames(
                  step === 3 ? "text-indigo-600" : "",
                  "text-right"
                )}
              />
            </div>
          </div>
        </div>
        <div className="bg-transparent rounded-lg border border-slate-600 py-5 sm:px-4">
          <div className="flex space-x-3 px-2">
            <div className="flex-shrink-0">
              <div className="bg-[url('https://static-exp1.licdn.com/sc/h/e6ihcsc6s32bb3f40skqtd5yx')] p-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-slate-300">
                <span>
                  Write a summary to highlight your personality or work
                  experience
                </span>
              </div>
            </div>
          </div>
          <div className="text-sm text-slate-300 px-2 mt-2">
            <span>
              Members who include a summary receive up to 3.9 times as many
              profile views.
            </span>
          </div>
          <div className="mt-4 px-2">
            <Button
              rounded="full"
              width="max"
              py="1"
              bg="transparent"
              hoverBg="slate-700"
            >
              <span className="text-slate-200">Add a summary</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SuggestedForYou;
