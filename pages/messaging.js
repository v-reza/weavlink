import ConversationsMessaging from "@/components/MessagingPages/ConversationsMessaging";
import ConversationsSearchMessaging from "@/components/MessagingPages/ConversationsSearchMessaging";
import ConversationsMobileMessaging from "@/components/MessagingPages/MobileView/ConversationsMobileMessaging";
import useAuth from "@/hooks/useAuth";
import useHeader from "@/hooks/useHeader";
import useUser from "@/hooks/useUser";
import Card from "@/uiComponents/Card";
import Container from "@/uiComponents/Container";
import Sidebar from "@/uiComponents/Sidebar";
import { axiosGet } from "@/utils/axiosInstance";
import { gridCols } from "@/utils/types";
import { DotsHorizontalIcon, PencilAltIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";

const Messaging = () => {
  /* Middleware Auth */
  const [isSSR, setIsSSR] = useState(true);
  const { isAuthenticated, token } = useAuth();
  const headers = useHeader(token);
  const { user } = useUser();
  useEffect(() => {
    setIsSSR(isAuthenticated);
  }, [isAuthenticated]);

  /* Conversations Hooks*/
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const getConversation = async () => {
      const res = await axiosGet("/conversations", headers);
      setConversations(res.data);
    };
    getConversation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);
  return (
    <>
      {isSSR && (
        <>
          <div className="max-w-5xl mx-auto px-5">
            <Card usePx0={true}>
              {/* Mobile View */}
              <ConversationsMobileMessaging conversations={conversations} />
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
      )}
    </>
  );
};

export default Messaging;
