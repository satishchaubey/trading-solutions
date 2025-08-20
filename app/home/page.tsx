'use client';
import { CardButton } from "@/components/comman/card-button";
import ResponsiveMenu  from "@/components/MenuBar/responsive-menu";
import { withAuth } from "@/utils/ProtectedRoute";
import { useRouter } from "next/navigation";
import { FaGift, FaTrophy, FaUserFriends, FaMoneyBill, FaWallet, FaHeadset } from "react-icons/fa";
function Home() {
  const router=useRouter();


  const handleCardClick = (label: string) => {
    return router.push(`/${label}`);
  };

  return (
    <div className="flex flex-col">
      <div className="flex  gap-4 p-4 justify-center mt-6">
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <CardButton icon={<FaMoneyBill />} label="Withdraw draw" Redirection="withdraw" onClick={handleCardClick}/>
          <CardButton icon={<FaWallet />} label="Recharge" Redirection="recharge" onClick={handleCardClick}/>
          <CardButton icon={<FaHeadset />} label="Service" Redirection="service" onClick={handleCardClick}/>
          <CardButton icon={<FaMoneyBill />} label="Withdraw" Redirection="withdraw" onClick={handleCardClick}/>
        </div>
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <CardButton icon={<FaGift />} label="Invite friends" Redirection="invite-friends" onClick={handleCardClick}/>
          <CardButton icon={<FaTrophy />} label="Task center" Redirection="task-center" onClick={handleCardClick}/>
          <CardButton icon={<FaTrophy />} label="Daily Task center" Redirection="daily-task-center" onClick={handleCardClick}/>
        </div>
      </div>
    </div>
  );
}


export default withAuth(Home);