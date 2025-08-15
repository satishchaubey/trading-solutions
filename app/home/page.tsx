'use client';
import { CardButton } from "@/components/comman/card-button";
import ResponsiveMenu  from "@/components/MenuBar/responsive-menu";
import { withAuth } from "@/utils/ProtectedRoute";
import { FaGift, FaTrophy, FaUserFriends, FaMoneyBill, FaWallet, FaHeadset } from "react-icons/fa";
function Home() {
  return (
    <div className="min-h-screen bg-yellow-300 flex flex-col">
      <div className="flex  gap-4 p-4 justify-center mt-6">
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <CardButton icon={<FaMoneyBill />} label="Withdraw draw" />
          <CardButton icon={<FaWallet />} label="Recharge" />
          <CardButton icon={<FaHeadset />} label="Service" />
          <CardButton icon={<FaMoneyBill />} label="Withdraw" />
        </div>
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <CardButton icon={<FaGift />} label="Invite friends" />
          <CardButton icon={<FaTrophy />} label="Task center" />
          <CardButton icon={<FaTrophy />} label="Daily Task center" />
        </div>
      </div>
    </div>
  );
}


export default withAuth(Home);