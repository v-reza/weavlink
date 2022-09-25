import ConversationsMessaging from "@/components/MessagingPages/ConversationsMessaging";
import ConversationsSearchMessaging from "@/components/MessagingPages/ConversationsSearchMessaging";
import ConversationsMobileMessaging from "@/components/MessagingPages/MobileView/ConversationsMobileMessaging";
import Card from "@/uiComponents/Card";
import Container from "@/uiComponents/Container";
import Sidebar from "@/uiComponents/Sidebar";
import { gridCols } from "@/utils/types";
import { DotsHorizontalIcon, PencilAltIcon } from "@heroicons/react/outline";
import React from "react";

const Messaging = () => {
  return (
    <>
      <div className="max-w-5xl mx-auto px-5">
        <Card usePx0={true}>
          {/* Mobile View */}
          <ConversationsMobileMessaging />
          {/* End Mobile View */}
        </Card>
      </div>
      <Container>
        <Container.Sidebar>
          <Sidebar lg={4} xl={4}>
            <Card usePx0={true}>
              <div className="h-[36rem] overflow-y-auto overflow-x-hidden">
                <div className="px-3 py-2 border-b border-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-md font-medium px-2">
                      Messaging
                    </span>
                    <div className="flex items-center space-x-3">
                      <div className="hover:bg-slate-700 rounded-full p-2 text-white cursor-pointer">
                        <DotsHorizontalIcon className="w-5 h-5" />
                      </div>
                      <div className="hover:bg-slate-700 rounded-full p-2 text-white cursor-pointer">
                        <PencilAltIcon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
                <ConversationsSearchMessaging />
                <ConversationsMessaging />
              </div>
            </Card>
          </Sidebar>
        </Container.Sidebar>
        <Container.Main
          lg={gridCols.lg[8]}
          xl={gridCols.xl[8]}
          md={gridCols.md[10]}
        >
          <Card usePx0={true}>
            <div className="h-[36rem] overflow-y-auto overflow-x-hidden hidden lg:block">
              <div className="px-3 py-2 border-b border-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-white text-md font-medium px-2">
                    Username
                  </span>
                  <div className="flex items-center space-x-3">
                    <div className="hover:bg-slate-700 rounded-full p-2 text-white cursor-pointer">
                      <DotsHorizontalIcon className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Container.Main>
      </Container>
    </>
  );
};

export default Messaging;
